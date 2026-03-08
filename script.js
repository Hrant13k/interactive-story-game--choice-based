/* =============================================================================
   THE KNIGHT'S BURDEN — script.js (v2 — Visual Novel Upgrade)
   ============================================================================= */

// --- DOM Elements ---
const bgA = document.getElementById('bg-a');
const bgB = document.getElementById('bg-b');
const sceneOverlay = document.getElementById('scene-overlay');
const characterPortrait = document.getElementById('character-portrait');
const characterNameEl = document.getElementById('character-name-label');
const storyTextEl = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const inventoryList = document.getElementById('inventory-list');
const restartBtn = document.getElementById('restart-btn');
const achievementsBtn = document.getElementById('achievements-btn');
const closeAchBtn = document.getElementById('close-achievements-btn');
const achievementsPanel = document.getElementById('achievements-panel');
const achievementsList = document.getElementById('achievements-list');
const achievementToast = document.getElementById('achievement-toast');
const toastTitleText = document.getElementById('toast-title-text');

// Audio
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');

// --- Achievement Definitions (all possible achievements) ---
const ACHIEVEMENT_DEFS = [
    { id: 'prepared', icon: '⚔️', label: 'Well Prepared', hint: 'Find a weapon before fighting.' },
    { id: 'peacemaker', icon: '☮️', label: 'Peacemaker', hint: 'Resolve a conflict without violence.' },
    { id: 'bandit_slayer', icon: '🗡️', label: 'Bandit Slayer', hint: 'Defeat the bandits on the road.' },
    { id: 'betrayal', icon: '🔥', label: 'Betrayed the Kingdom', hint: 'Join the bandit ranks.' },
    { id: 'loyal_knight', icon: '🛡️', label: 'Loyal Knight', hint: 'Accept the king\'s quest.' },
    { id: 'dragon_slayer', icon: '🏆', label: 'Dragon Slayer', hint: 'Slay the dragon and save the realm.' },
];

// --- Game State ---
let currentBg = bgA;   // Which background div is "active"
let nextBg = bgB;
let currentSceneId = 'start';
let inventory = [];
let unlockedAchievements = new Set();
let typeWriterTimerId = null;
let isAudioInitialized = false;
let toastTimerId = null;

// =============================================================================
// INITIALIZATION
// =============================================================================
function initGame() {
    loadState();
    renderInventory();
    renderScene(currentSceneId, { instant: true });

    restartBtn.addEventListener('click', handleRestart);
    achievementsBtn.addEventListener('click', openAchievementsPanel);
    closeAchBtn.addEventListener('click', closeAchievementsPanel);

    // Close panel on outside click
    achievementsPanel.addEventListener('click', (e) => {
        if (e.target === achievementsPanel) closeAchievementsPanel();
    });
}

// =============================================================================
// SAVE / LOAD
// =============================================================================
function loadState() {
    const savedScene = localStorage.getItem('kgb_currentScene');
    const savedInv = localStorage.getItem('kgb_inventory');
    const savedAch = localStorage.getItem('kgb_achievements');

    if (savedScene && storyData[savedScene]) currentSceneId = savedScene;
    if (savedInv) inventory = JSON.parse(savedInv);
    if (savedAch) unlockedAchievements = new Set(JSON.parse(savedAch));
}

function saveState() {
    localStorage.setItem('kgb_currentScene', currentSceneId);
    localStorage.setItem('kgb_inventory', JSON.stringify(inventory));
    localStorage.setItem('kgb_achievements', JSON.stringify([...unlockedAchievements]));
}

// =============================================================================
// SCENE RENDERING
// =============================================================================

/**
 * Navigate to a scene ID, with optional cinematic fade transition.
 * @param {string} sceneId
 * @param {{ instant?: boolean }} options
 */
function renderScene(sceneId, options = {}) {
    const scene = storyData[sceneId];
    if (!scene) { console.error(`Scene not found: ${sceneId}`); return; }

    if (options.instant) {
        applyScene(scene, sceneId);
    } else {
        // Fade to black then apply scene, then fade back
        sceneOverlay.classList.add('fade-in');
        setTimeout(() => {
            applyScene(scene, sceneId);
            sceneOverlay.classList.remove('fade-in');
        }, 400);
    }
}

/** Apply scene state immediately (background, portrait, text, choices, achievements) */
function applyScene(scene, sceneId) {
    currentSceneId = sceneId;
    saveState();

    // 1. Background crossfade
    if (scene.background) {
        crossfadeBackground(scene.background);
    }

    // 2. Character portrait
    if (scene.character) {
        characterPortrait.src = scene.character;
        characterPortrait.classList.add('visible');
    } else {
        characterPortrait.classList.remove('visible');
        characterPortrait.src = '';
    }

    // 3. Grant item (if any)
    if (scene.item && !inventory.includes(scene.item)) {
        inventory.push(scene.item);
        renderInventory();
        saveState();
    }

    // 4. Unlock achievement (if any)
    if (scene.achievement) {
        const { id, label } = scene.achievement;
        unlockAchievement(id, label);
    }

    // 5. Clear choices while typing
    choicesContainer.innerHTML = '';

    // 6. Character name label
    renderCharacterName(scene.characterName);

    // 7. Typewriter effect → then reveal choices
    typeWriter(scene.text, () => {
        renderChoices(scene.choices);
    });
}

// =============================================================================
// BACKGROUND CROSSFADE
// =============================================================================
function crossfadeBackground(src) {
    // Pre-load image into the "next" layer
    nextBg.style.backgroundImage = `url('${src}')`;
    nextBg.classList.add('active');
    currentBg.classList.remove('active');

    // Swap references
    [currentBg, nextBg] = [nextBg, currentBg];
}

// =============================================================================
// CHARACTER NAME LABEL
// =============================================================================
function renderCharacterName(name) {
    if (name) {
        characterNameEl.textContent = name;
    } else {
        characterNameEl.textContent = '';
    }
}

// =============================================================================
// TYPEWRITER EFFECT
// =============================================================================
function typeWriter(text, onComplete) {
    if (typeWriterTimerId) clearTimeout(typeWriterTimerId);

    storyTextEl.textContent = '';
    storyTextEl.classList.add('typewriter-cursor');

    let i = 0;
    const speed = 22;

    function tick() {
        if (i < text.length) {
            storyTextEl.textContent += text.charAt(i);
            i++;
            typeWriterTimerId = setTimeout(tick, speed);
        } else {
            storyTextEl.classList.remove('typewriter-cursor');
            if (onComplete) onComplete();
        }
    }
    tick();
}

// =============================================================================
// CHOICES (with stagger slide-in animation)
// =============================================================================
function renderChoices(choices) {
    choicesContainer.innerHTML = '';

    choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.classList.add('choice-btn');

        let labelHTML = choice.text;

        if (choice.requiredItem) {
            const hasItem = inventory.includes(choice.requiredItem);
            if (!hasItem) {
                btn.disabled = true;
                labelHTML += `<span class="item-requirement">🔒 Requires: ${choice.requiredItem}</span>`;
            } else {
                labelHTML += `<span class="item-requirement">✓ Have: ${choice.requiredItem}</span>`;
            }
        }

        btn.innerHTML = labelHTML;

        btn.addEventListener('click', () => {
            playClickAudio();
            renderScene(choice.next);
        });

        choicesContainer.appendChild(btn);

        // Stagger the slide-in animation
        setTimeout(() => btn.classList.add('revealed'), 60 + index * 90);
    });
}

// =============================================================================
// INVENTORY
// =============================================================================
function renderInventory() {
    inventoryList.innerHTML = '';

    if (inventory.length === 0) {
        const li = document.createElement('li');
        li.className = 'inventory-empty';
        li.textContent = 'Nothing yet...';
        inventoryList.appendChild(li);
        return;
    }

    inventory.forEach(item => {
        const li = document.createElement('li');
        li.className = 'inventory-item';
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// =============================================================================
// ACHIEVEMENT SYSTEM
// =============================================================================

/** Unlock an achievement by ID and show a toast if it's new. */
function unlockAchievement(id, label) {
    if (unlockedAchievements.has(id)) return; // Already unlocked

    unlockedAchievements.add(id);
    saveState();

    // Find icon
    const def = ACHIEVEMENT_DEFS.find(a => a.id === id);
    const icon = def ? def.icon : '🏆';
    const displayLabel = def ? def.label : label;

    showAchievementToast(displayLabel, icon);
}

/** Display a corner toast notification for ~3.5 seconds. */
function showAchievementToast(label, icon = '🏆') {
    if (toastTimerId) clearTimeout(toastTimerId);

    toastTitleText.textContent = label;
    // Update icon
    achievementToast.querySelector('.toast-icon').textContent = icon;

    achievementToast.classList.add('show');

    toastTimerId = setTimeout(() => {
        achievementToast.classList.remove('show');
    }, 3500);
}

/** Open the achievements panel and populate it. */
function openAchievementsPanel() {
    achievementsList.innerHTML = '';

    ACHIEVEMENT_DEFS.forEach(def => {
        const isUnlocked = unlockedAchievements.has(def.id);
        const li = document.createElement('li');
        li.className = `achievement-entry ${isUnlocked ? 'unlocked' : 'locked'}`;

        li.innerHTML = `
            <span class="achievement-icon">${def.icon}</span>
            <div>
                <div class="achievement-label">${def.label}</div>
                <div class="achievement-status">${isUnlocked ? '✓ Unlocked' : def.hint}</div>
            </div>
        `;
        achievementsList.appendChild(li);
    });

    achievementsPanel.classList.remove('panel-hidden');
}

function closeAchievementsPanel() {
    achievementsPanel.classList.add('panel-hidden');
}

// =============================================================================
// RESTART
// =============================================================================
function handleRestart() {
    playClickAudio();

    // Fade to black
    sceneOverlay.classList.add('fade-in');

    setTimeout(() => {
        // Clear state
        inventory = [];
        currentSceneId = 'start';
        unlockedAchievements = new Set();
        localStorage.removeItem('kgb_currentScene');
        localStorage.removeItem('kgb_inventory');
        localStorage.removeItem('kgb_achievements');

        renderInventory();
        applyScene(storyData['start'], 'start');
        sceneOverlay.classList.remove('fade-in');
    }, 400);
}

// =============================================================================
// AUDIO
// =============================================================================
function playClickAudio() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => { });

    if (!isAudioInitialized) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => { });
        isAudioInitialized = true;
    }
}

// =============================================================================
// BOOTSTRAP
// =============================================================================
window.addEventListener('load', initGame);
