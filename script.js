// DOM Elements
const backgroundLayer = document.getElementById('background-layer');
const characterPortrait = document.getElementById('character-portrait');
const storyTextEl = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const inventoryList = document.getElementById('inventory-list');
const restartBtn = document.getElementById('restart-btn');

// Audio Elements
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');

// Game State
let currentSceneId = 'start';
let inventory = [];
let typeWriterTimeout = null;
let isAudioInitialized = false;

// Initialize Game
function initGame() {
    // Load from local storage
    const savedScene = localStorage.getItem('kgb_currentScene');
    const savedInventory = localStorage.getItem('kgb_inventory');

    if (savedScene && storyData[savedScene]) {
        currentSceneId = savedScene;
    }

    if (savedInventory) {
        inventory = JSON.parse(savedInventory);
    }

    renderInventory();
    renderScene(currentSceneId);

    // Event listener for restart button
    restartBtn.addEventListener('click', restartGame);
}

// Render a Scene
function renderScene(sceneId) {
    const scene = storyData[sceneId];
    if (!scene) {
        console.error(`Scene ${sceneId} not found!`);
        return;
    }

    currentSceneId = sceneId;
    saveGame();

    // 1. Update Background
    if (scene.background) {
        backgroundLayer.style.backgroundImage = `url('${scene.background}')`;
    }

    // 2. Update Character Portrait
    if (scene.character) {
        characterPortrait.src = scene.character;
        characterPortrait.classList.add('visible');
    } else {
        characterPortrait.classList.remove('visible');
    }

    // 3. Grant Items
    if (scene.item && !inventory.includes(scene.item)) {
        inventory.push(scene.item);
        renderInventory();
        saveGame();
    }

    // 4. Clear old choices while text is typing
    choicesContainer.innerHTML = '';

    // 5. Typewriter Effect
    typeWriterEffect(scene.text, () => {
        // Callback after typing finishes
        renderChoices(scene.choices);
    });
}

// Typewriter Effect
function typeWriterEffect(text, onComplete) {
    if (typeWriterTimeout) clearTimeout(typeWriterTimeout);

    storyTextEl.innerHTML = '';
    storyTextEl.classList.add('typewriter-cursor');

    let i = 0;
    const speed = 25; // ms per character

    function type() {
        if (i < text.length) {
            storyTextEl.innerHTML += text.charAt(i);
            i++;
            typeWriterTimeout = setTimeout(type, speed);
        } else {
            storyTextEl.classList.remove('typewriter-cursor');
            if (onComplete) onComplete();
        }
    }
    type();
}

// Render Choices
function renderChoices(choices) {
    choicesContainer.innerHTML = '';

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.classList.add('choice-btn', 'ui-button');

        let btnText = choice.text;

        // Check for required items
        if (choice.requiredItem) {
            if (!inventory.includes(choice.requiredItem)) {
                btn.disabled = true;
                btnText += ` <span class="item-requirement">(Missing ${choice.requiredItem})</span>`;
            } else {
                btnText += ` <span class="item-requirement">(Has ${choice.requiredItem})</span>`;
            }
        }

        btn.innerHTML = btnText;

        btn.addEventListener('click', () => {
            playAudio();
            renderScene(choice.next);
        });

        choicesContainer.appendChild(btn);
    });
}

// Render Inventory
function renderInventory() {
    inventoryList.innerHTML = '';

    if (inventory.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.textContent = 'Empty';
        emptyMsg.style.color = '#555';
        emptyMsg.style.fontStyle = 'italic';
        inventoryList.appendChild(emptyMsg);
        return;
    }

    inventory.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('inventory-item');
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// Save/Load System
function saveGame() {
    localStorage.setItem('kgb_currentScene', currentSceneId);
    localStorage.setItem('kgb_inventory', JSON.stringify(inventory));
}

function restartGame() {
    playAudio();
    localStorage.removeItem('kgb_currentScene');
    localStorage.removeItem('kgb_inventory');
    inventory = [];
    currentSceneId = 'start';
    renderScene('start');
    renderInventory();
}

// Audio System Wrapper
// Browsers block autoplay, so we initialize music on the first user click anywhere in the game
function playAudio() {
    // Play interaction sound
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log('Audio blocked:', e));

    if (!isAudioInitialized) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('BGM blocked:', e));
        isAudioInitialized = true;
    }
}

// Initialize on window load
window.addEventListener('load', initGame);
