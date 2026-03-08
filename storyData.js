const storyData = {
    "start": {
        characterName: "The Narrator",
        text: "You are a wandering knight approaching a troubled kingdom. The sun sets, casting long shadows across the landscape. The kingdom has been ravaged by bandits and dark magic.",
        background: "backgrounds/landscape.webp",
        character: "characters/knightpng",
        choices: [
            { text: "Travel the main road", next: "main_road" },
            { text: "Investigate the dark woods", next: "woods" }
        ]
    },
    "main_road": {
        characterName: "The Narrator",
        text: "You walk along the main road and spot an abandoned merchant cart. It looks like it was recently attacked. The smell of smoke still lingers in the air.",
        background: "backgrounds/landscape.webp",
        choices: [
            { text: "Search the cart", next: "search_cart" },
            { text: "Ignore it and keep moving", next: "bandits_ambush" }
        ]
    },
    "search_cart": {
        characterName: "The Narrator",
        text: "Among the scattered goods, you find a sturdy iron sword. The blade is nicked but strong. It will serve you well on the road ahead.",
        background: "backgrounds/landscape.webp",
        item: "Sword",
        achievement: { id: "prepared", label: "Well Prepared" },
        choices: [
            { text: "Continue down the road", next: "bandits_ambush" }
        ]
    },
    "woods": {
        characterName: "The Narrator",
        text: "The woods are thick and eerie. Fog clings to the moss-covered ground. Up ahead, you see an old woman chanting near a roaring fire.",
        background: "backgrounds/forest.jpg",
        character: "characters/witch.png",
        choices: [
            { text: "Approach and listen carefully", next: "witch_talk" },
            { text: "Attack her immediately!", next: "witch_attack" }
        ]
    },
    "witch_talk": {
        characterName: "The Witch",
        text: "She senses your noble spirit. Her eyes soften as she presses a sealed parchment into your gauntleted hand. 'Bring this to the King — he awaits a true champion,' she whispers, before dissolving into the mist.",
        background: "backgrounds/forest.jpg",
        character: "characters/witch.png",
        item: "Royal Letter",
        achievement: { id: "peacemaker", label: "Peacemaker" },
        choices: [
            { text: "Head towards the castle", next: "castle_gates" }
        ]
    },
    "witch_attack": {
        characterName: "The Witch",
        text: "As you raise your weapon, her eyes ignite with a cold green flame. 'Foolish knight,' she hisses. A terrible curse tightens around you, turning your flesh slowly to stone. Your journey ends here.",
        background: "backgrounds/forest.jpg",
        character: "characters/witch.png",
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "bandits_ambush": {
        characterName: "Bandit Leader",
        text: "'Stand and deliver!' A dozen armed bandits burst from the treeline, blades gleaming. Their leader — a scarred brute with a crossbow — levels it at your chest. 'Your coin or your life, wanderer.'",
        background: "backgrounds/forest.jpg",
        choices: [
            { text: "⚔ Fight back! (Requires Sword)", next: "bandit_victory", requiredItem: "Sword" },
            { text: "Fight barehanded", next: "bandit_defeat" },
            { text: "Surrender your belongings", next: "bandit_capture" },
            { text: "Join their ranks instead", next: "join_bandits" }
        ]
    },
    "join_bandits": {
        characterName: "Bandit Leader",
        text: "The leader grins, a gold tooth glinting. 'Smart knight. The kingdom bleeds the common folk — and we take our share back.' You spend your days raiding caravans. The king's justice never finds you.",
        background: "backgrounds/forest.jpg",
        achievement: { id: "betrayal", label: "Betrayed the Kingdom" },
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "bandit_capture": {
        characterName: "The Narrator",
        text: "They strip you of your gear, bind you to a great oak, and vanish into the dark. Days pass. No traveler comes. Your strength fails you.",
        background: "backgrounds/forest.jpg",
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "bandit_victory": {
        characterName: "The Narrator",
        text: "Your iron sword strikes true! The bandits scatter into the undergrowth like rats. Searching the fallen leader, your fingers close around a heavy iron key — engraved with a castle crest.",
        background: "backgrounds/forest.jpg",
        item: "Key",
        achievement: { id: "bandit_slayer", label: "Bandit Slayer" },
        choices: [
            { text: "Continue towards the castle", next: "castle_gates" }
        ]
    },
    "bandit_defeat": {
        characterName: "The Narrator",
        text: "You fight with the valor of a lion, but without a blade, fists are no match for steel. They leave you bleeding in the dirt. The crows circle overhead.",
        background: "backgrounds/forest.jpg",
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "castle_gates": {
        characterName: "Castle Guard",
        text: "'Halt! The gates are closed to vagabonds and wanderers.' Two guards cross their halberds. Behind them, the great iron portcullis stands firm. You must find another way in — or the right key.",
        background: "backgrounds/landscape.webp",
        choices: [
            { text: "📜 Present the Royal Letter (Requires Royal Letter)", next: "enter_castle", requiredItem: "Royal Letter" },
            { text: "Try to scale the wall at night", next: "dungeon" },
            { text: "Challenge the guards to single combat", next: "guard_fight" }
        ]
    },
    "guard_fight": {
        characterName: "Castle Guard",
        text: "'Madman!' The Royal Guard cuts you down before your second swing lands. Brave, certainly. Wise, not so much.",
        background: "backgrounds/landscape.webp",
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "dungeon": {
        characterName: "The Narrator",
        text: "You nearly make it over the battlements before a patrol spots you. They drag you to the dungeon. In the dark, you hear the king's proclamation echoing: 'No mercy for trespassers.'",
        background: "backgrounds/throne-room.jpg",
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "enter_castle": {
        characterName: "Castle Guard",
        text: "The guard's eyes widen at the royal seal. He snaps to attention and waves you through. 'The King has been expecting a champion.' You stride into the glorious throne room, your boots echoing on marble.",
        background: "backgrounds/throne-room.jpg",
        choices: [
            { text: "Approach the King", next: "meet_king" }
        ]
    },
    "meet_king": {
        characterName: "King Aldric",
        text: "'Knight — thank the gods you've come.' The King rises from his throne, exhaustion carved into every line of his face. 'A dragon has descended upon the Wraithpeak Mountains and razed three villages. You are the only one who has answered the call. Will you face it?'",
        background: "backgrounds/throne-room.jpg",
        character: "characters/king.png",
        choices: [
            { text: "Bow. 'I will face it, my King.'", next: "accept_quest" },
            { text: "'I refuse. Find another fool.'", next: "king_angry" }
        ]
    },
    "accept_quest": {
        characterName: "King Aldric",
        text: "'Then you are the kingdom's last hope.' The King descends from his throne and clasps your hand. 'Return victorious, and you shall want for nothing.' His gratitude is real — and fierce.",
        background: "backgrounds/throne-room.jpg",
        character: "characters/king.png",
        achievement: { id: "loyal_knight", label: "Loyal Knight" },
        choices: [
            { text: "Ride for the dragon's lair", next: "dragon_lair" }
        ]
    },
    "king_angry": {
        characterName: "King Aldric",
        text: "'Cowardice is treason!' The King's voice cracks like a whip through the vaulted hall. Guards seize you before you can move. You meet your end at dawn.",
        background: "backgrounds/throne-room.jpg",
        character: "characters/king.png",
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "dragon_lair": {
        characterName: "The Narrator",
        text: "You climb the scorched slopes of Wraithpeak. The stench of sulfur is overwhelming. Inside the mouth of the mountain cave, two enormous amber eyes open in the dark. A wave of heat washes over you.",
        background: "backgrounds/forest.jpg",
        character: "characters/dragon.webp",
        choices: [
            { text: "🗝 Use the iron key on the ancient chest (Requires Key)", next: "dragon_chest", requiredItem: "Key" },
            { text: "Charge the dragon with your sword", next: "dragon_fight" }
        ]
    },
    "dragon_fight": {
        characterName: "The Narrator",
        text: "Your sword shatters against its scales like glass against stone. In a single breath, dragonfire fills the cave. Your tale ends on the mountaintop, beneath a sky that never saw you fail.",
        background: "backgrounds/forest.jpg",
        character: "characters/dragon.webp",
        choices: [
            { text: "‹ Game Over — Try Again", next: "start" }
        ]
    },
    "dragon_chest": {
        characterName: "The Narrator",
        text: "The key turns. Inside the iron chest, wrapped in ancient cloth, lies the Dragonsbane Spear — a weapon forged in dragonfire itself. You hurl it in a single fluid motion. It pierces the dragon's heart. A kingdom-shaking roar fades into silence. You are the hero of the realm.",
        background: "backgrounds/landscape.webp",
        character: "characters/knightpng",
        achievement: { id: "dragon_slayer", label: "Dragon Slayer" },
        choices: [
            { text: "⚔ Play Again", next: "start" }
        ]
    }
};
