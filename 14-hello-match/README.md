<h1 align="center">Hello, Match!</h1>

*A simple card-flip memory game with a developer twist: match the programming language with the "Hello, World!" code!*

<img src="assets/img/sample.png" style="width: 100%; border-radius: 4px;" />

### [Try it out here!](https://mhollingshead.github.io/30-days-30-projects/14-hello-match/build/)

### Tech Stack

* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="16" height="16" /> JavaScript
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" width="16" height="16" /> Vue.js
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="16" height="16" /> CSS
* [Highlight.js](https://highlightjs.org/)
* [canvas-confetti](https://www.kirilv.com/canvas-confetti/)

## Install and Run

1. Download / navigate to the `/14-hello-match` directory.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm run serve`.

By default, the app should be accessible at [http://localhost:8080](http://localhost:8080).

## Implementation

For my second Vue project, I wanted to keep things fairly simple while learning about communication between parent and child components using emissions.

Interestingly, the bulk of the work was the collecting of language data:

* **Logos** are taken from [Devicon](https://devicon.dev/)
* **Hello World** programs were taken from [this GitHub repository](https://github.com/leachim6/hello-world) and adapted slightly.

Any language that had a devicon logo and a Hello World that was short enough to fit on the card was used.

Because several languages share the same Hello World program (3 of them are simply `print("Hello, world!")`), a file name is also provided to be able to distinguish between code that could apply to multiple languages.

Our game board is represented by an `Array` of card objects, which have the following properties:

* `language`, the language that the card represents,
* `type`, the type of card it is: either `logo` or `code`,
* `index`, the card's index in the card array (used for easily flipping cards),
* `isFlipped`, whether the card is currently flipped, and
* `isMatched`, whether the card has been matched with its counterpart.

The board array is populated using the `newGame` method, which is called `beforeMount` or whenever the user clicks the "New Game" button:

```javascript
newGame() {
    // The number of languages on the board, which is the number of cards / 2
    const numLanguages = difficulties[this.difficulty]**2 / 2;
    // Shuffle the languages and select the right amount
    const boardLanguages = shuffle(languages).slice(0, numLanguages);
    // Initialize a new empty board
    const board = [];
    // For each language, push a logo and code card to the new board
    boardLanguages.forEach(language => {
        const card1 = { language, type: 'logo', isFlipped: false, isMatched: false };
        const card2 = { language, type: 'code', isFlipped: false, isMatched: false };
        board.push(card1, card2);
    });
    // Save the new board in state
    this.board = shuffle(board);
},
```

Cards are rendered based on their individual states. If a card `isFlipped` or `isMatched`, it's face-up, otherwise it's face-down. We also have a `flip` method, which attempts to flip a card when it's clicked:

```javascript
flip(index) {
    // Get any cards on the board that are already flipped
    const flipped = this.board.filter(card => card.isFlipped);
    // If two cards are flipped (i.e. they're about to be unflipped)
    // then do nothing.
    if (flipped.length > 1) return;
    // If only one card is flipped
    else if (flipped.length === 1) {
        // Get the card that's already flipped and the card that
        // is going to be flipped
        const card1 = flipped[0];
        const card2 = this.board[index];
        // If they're a match (i.e. they have the same language value)
        // Then set both isMatched attributes to true
        if (card1.language === card2.language) {
            card1.isMatched = true;
            card2.isMatched = true;
            card1.isFlipped = false;
            // Check to see if the player has won
            this.checkForWin();
        // Otherwise, the two cards don't match
        } else {
            // Temporarily flip the card
            card2.isFlipped = true;
            // Unflip both cards in 1.5 seconds
            setTimeout(() => {
                card1.isFlipped = false;
                card2.isFlipped = false;
            }, 1500);
        }
    // Otherwise, this is the first card to be flipped,
    } else {
        // so flip it
        this.board[index].isFlipped = true;
    }
}
```

Other than our `changeDifficulty` method and our `checkForWin` method (which simply checks to see if the number of matched cards is equal to the total number of cards), this is our main functionality.

We do any syntax highlighting with Highlight.js on the game board's `updated` event using `hljs.highlightAll()`. Any supported languages are tagged accordingly. Though `highlightAll()` will be called quite a bit, it should only perform all of the highlighting on its first invokation.

We also use canvas-confetti to provide some fanfare when the game has been won.