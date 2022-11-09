<script>
import hljs from 'highlight.js';
import Card from './components/Card.vue';
import Header from './components/Header.vue';
import { difficulties, languages } from './common/constants';
import { shuffle, launchConfetti } from './common/utils';
export default {
  name: 'App',
  data() {
    return {
      difficulty: 1,
      board: []
    }
  },
  components: {
    Card,
    Header
  },
  methods: {
    newGame() {
      this.board = [];
      // The number of languages on the board, which is the number of cards / 2
      const numLanguages = difficulties[this.difficulty] ** 2 / 2;
      // Shuffle the languages and select the right amount
      const boardLanguages = shuffle(languages).slice(0, numLanguages);
      // Initialize a new empty board
      const board = [];
      // For each language, push a logo and code card to the new board
      boardLanguages.forEach(language => {
        const card1 = { language, type: 'icon', isFlipped: false, isMatched: false };
        const card2 = { language, type: 'code', isFlipped: false, isMatched: false };
        board.push(card1, card2);
      });
      // Save the new board in state
      this.board = shuffle(board);
    },
    checkForWin() {
      // If the number of flipped cards equals the number of total cards,
      // the player has won.
      if (this.board.length === this.board.filter(card => card.isMatched).length) {
        setTimeout(launchConfetti, 500);
      }
    },
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
    },
    changeDifficulty(difficulty) {
      this.difficulty = difficulty;
      this.newGame();
    }
  },
  beforeMount() {
    this.newGame();
  },
  updated() {
    hljs.highlightAll();
  }
}
</script>

<template>
  <Header :difficulty="difficulty" @newGame="newGame" @changeDifficulty="changeDifficulty" />
  <section class="board" :class="difficulty == 0 ? 'easy' : difficulty == 1 ? 'medium' : 'hard'">
    <Card v-for="(card, index) in board" :key="`${card.language}-${card.type}`" :index="index" :language="card.language"
      :type="card.type" :isFlipped="card.isFlipped" :isMatched="card.isMatched" @flip="flip" />
  </section>
  <div class="confetti"></div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f2f2f2;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.board {
  display: grid;
  justify-content: center;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}

.board.easy {
  grid-template-columns: 14rem 14rem;
  grid-template-rows: 8rem 8rem;
}

.board.medium {
  grid-template-columns: 14rem 14rem 14rem 14rem;
  grid-template-rows: 8rem 8rem 8rem 8rem;
}

.board.hard {
  grid-template-columns: 14rem 14rem 14rem 14rem 14rem 14rem;
  grid-template-rows: 8rem 8rem 8rem 8rem 8rem 8rem;
}

.confetti {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
