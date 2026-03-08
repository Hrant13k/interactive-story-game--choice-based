# The Knight's Burden - Interactive Story Game

A medieval fantasy interactive story game built with HTML, CSS, and Vanilla JavaScript. The game features branching storylines, multiple endings, an inventory system, and dynamic audio-visual states.

To play, simply open `index.html` in your web browser.

---

## How to Expand the Game

You can easily add new content to this game without modifying the core engine (`script.js`). Everything is controlled via the `storyData.js` file and by placing assets into the respective folders.

### 1. How to Add New Backgrounds
1. Place your new background image (e.g., `cave.jpg`) inside the `backgrounds/` folder.
2. In `storyData.js`, assign it to a scene using the `background` property:
   ```javascript
   "scene_id": {
       text: "You enter a dark cave...",
       background: "backgrounds/cave.jpg",
       choices: [ ... ]
   }
   ```

### 2. How to Add New Characters
1. Place a portrait image (preferably with a transparent background, e.g., `goblin.png`) in the `characters/` folder.
2. Assign it to a scene using the `character` property.
   ```javascript
   "scene_id": {
       text: "A goblin appears!",
       background: "backgrounds/forest.jpg",
       character: "characters/goblin.png",
       choices: [ ... ]
   }
   ```
*(Note: If a scene has no `character` property, the portrait area will remain empty.)*

### 3. How to Add New Scenes
To add a new scene, create a new object key in `storyData.js` and link it to existing choices:
```javascript
"new_scene_id": {
    text: "Here is what happens in this new scene.",
    background: "backgrounds/landscape.webp", // Path to background
    character: "characters/knightpng",        // Optional: Path to character
    item: "Magic Potion",                     // Optional: Grants an item 
    choices: [
        { text: "Go back", next: "previous_scene_id" },
        { text: "Move forward", next: "another_scene_id" }
    ]
}
```

### 4. How to Add New Items (and Conditional Choices)
Items are automatically added to the inventory if you include the `item` property in a scene.
1. Add `item: "Item Name"` to the scene where the player finds it.
2. To make a choice **require** that item (disabled if missing), use `requiredItem`:
   ```javascript
   {
       text: "Unlock the magical door",
       next: "secret_room_scene",
       requiredItem: "Magic Potion"
   }
   ```