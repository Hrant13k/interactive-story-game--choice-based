const storyData = {
    "start": {
        text: "You are a wandering knight approaching a troubled kingdom. The sun sets, casting long shadows across the landscape. The kingdom has been ravaged by bandits and dark magic.",
        background: "backgrounds/landscape.webp",
        character: "characters/knightpng",
        choices: [
            { text: "Travel the main road", next: "main_road" },
            { text: "Investigate the dark woods", next: "woods" }
        ]
    },
    "main_road": {
        text: "You walk along the main road and spot an abandoned merchant cart. It looks like it was recently attacked.",
        background: "backgrounds/landscape.webp",
        choices: [
            { text: "Search the cart", next: "search_cart" },
            { text: "Ignore it and keep moving", next: "bandits_ambush" }
        ]
    },
    "search_cart": {
        text: "Among the scattered goods, you find a sturdy iron sword. It will serve you well.",
        background: "backgrounds/landscape.webp",
        item: "Sword",
        choices: [
            { text: "Continue down the road", next: "bandits_ambush" }
        ]
    },
    "woods": {
        text: "The woods are thick and eerie. Up ahead, you see an old woman chanting near a fire.",
        background: "backgrounds/forest.jpg",
        character: "characters/witch.png",
        choices: [
            { text: "Approach and listen", next: "witch_talk" },
            { text: "Attack her immediately!", next: "witch_attack" }
        ]
    },
    "witch_talk": {
        text: "She senses your noble spirit and hands you a sealed parchment. 'To the King,' she whispers before vanishing.",
        background: "backgrounds/forest.jpg",
        item: "Royal Letter",
        choices: [
            { text: "Head towards the castle", next: "castle_gates" }
        ]
    },
    "witch_attack": {
        text: "As you raise your weapon, her eyes glow green. A terrible curse turns your flesh to stone.",
        background: "backgrounds/forest.jpg",
        character: "characters/witch.png",
        choices: [
            { text: "Game Over", next: "start" }
        ]
    },
    "bandits_ambush": {
        text: "A group of hostile bandits jumps out from the bushes, demanding your coin or your life!",
        background: "backgrounds/forest.jpg",
        choices: [
            { text: "Fight back! (Requires Sword)", next: "bandit_victory", requiredItem: "Sword" },
            { text: "Fight barehanded", next: "bandit_defeat" },
            { text: "Surrender your belongings", next: "bandit_capture" }
        ]
    },
    "bandit_capture": {
        text: "They take everything you own and leave you tied to a tree. You eventually perish from starvation.",
        background: "backgrounds/forest.jpg",
        choices: [
            { text: "Game Over", next: "start" }
        ]
    },
    "bandit_victory": {
        text: "Your iron sword strikes true! The bandits scatter. Searching their leader, you find a heavy iron key.",
        background: "backgrounds/forest.jpg",
        item: "Key",
        choices: [
            { text: "Continue towards the castle", next: "castle_gates" }
        ]
    },
    "bandit_defeat": {
        text: "You fight bravely, but without a weapon, you are quickly overpowered. Your journey ends here.",
        background: "backgrounds/forest.jpg",
        choices: [
            { text: "Game Over", next: "start" }
        ]
    },
    "castle_gates": {
        text: "You arrive at the heavily guarded castle gates. The guards refuse entry to vagabonds.",
        background: "backgrounds/landscape.webp",
        choices: [
            { text: "Show the Royal Letter (Requires Royal Letter)", next: "enter_castle", requiredItem: "Royal Letter" },
            { text: "Try to sneak over the wall", next: "dungeon" },
            { text: "Fight the guards", next: "guard_fight" }
        ]
    },
    "guard_fight": {
        text: "Are you mad? The Royal Guards are elite soldiers. They cut you down instantly.",
        background: "backgrounds/landscape.webp",
        choices: [
            { text: "Game Over", next: "start" }
        ]
    },
    "dungeon": {
        text: "You slip and fall from the walls. The guards capture you and throw you in the dungeon forever.",
        background: "backgrounds/throne-room.jpg",
        choices: [
            { text: "Game Over", next: "start" }
        ]
    },
    "enter_castle": {
        text: "The guards see the King's seal and respectfully step aside. You walk into the glorious throne room.",
        background: "backgrounds/throne-room.jpg",
        choices: [
            { text: "Approach the King", next: "meet_king" }
        ]
    },
    "meet_king": {
        text: "The King looks exhausted. 'Knight, a dragon terrorizes our lands. Can you slay it?'",
        background: "backgrounds/throne-room.jpg",
        character: "characters/king.png",
        choices: [
            { text: "Bow and accept the quest", next: "dragon_lair" },
            { text: "Refuse. It's too dangerous.", next: "king_angry" }
        ]
    },
    "king_angry": {
        text: "Cowardice is treason! The King orders your execution.",
        background: "backgrounds/throne-room.jpg",
        character: "characters/king.png",
        choices: [
            { text: "Game Over", next: "start" }
        ]
    },
    "dragon_lair": {
        text: "You hike to the mountain peak and enter the lair. The massive beast awakens!",
        background: "backgrounds/forest.jpg",
        character: "characters/dragon.webp",
        choices: [
            { text: "Unlock ancient chest (Requires Key)", next: "dragon_chest", requiredItem: "Key" },
            { text: "Attack the dragon directly", next: "dragon_fight" }
        ]
    },
    "dragon_fight": {
        text: "Your mortal weapons shatter against its scales. You are consumed by dragonfire.",
        background: "backgrounds/forest.jpg",
        character: "characters/dragon.webp",
        choices: [
            { text: "Game Over", next: "start" }
        ]
    },
    "dragon_chest": {
        text: "The key fits! Inside is the legendary Dragonsbane Spear. You hurl it, piercing the dragon's heart. You saved the kingdom!",
        background: "backgrounds/landscape.webp",
        character: "characters/knightpng",
        choices: [
            { text: "Play Again", next: "start" }
        ]
    }
};
