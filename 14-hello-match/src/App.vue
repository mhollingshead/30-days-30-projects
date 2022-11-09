<script>
import hljs from 'highlight.js';
import Card from './components/Card.vue';
import { difficulties, languages } from './common/constants';
import { shuffle } from './common/utils';
export default {
  name: 'App',
  data() {
    return {
      difficulty: 2,
      board: []
    }
  },
  components: {
    Card
  },
  methods: {
    newGame() {
      const numLanguages = difficulties[this.difficulty]**2 / 2;
      const boardLanguages = shuffle(languages).slice(0, numLanguages);
      const board = [];
      boardLanguages.forEach(language => {
        const card1 = { language, type: 'icon', isFlipped: false };
        const card2 = { language, type: 'code', isFlipped: false };
        board.push(card1, card2);
      });
      this.board = shuffle(board);
    },
    flip(index) {
      this.board[index].isFlipped = true;
    }
  },
  beforeMount() {
    this.newGame();
  },
  mounted() {
    hljs.highlightAll();
  }
}
</script>

<template>
  <section class="board" :class="difficulty === 0 ? 'easy' : difficulty === 1 ? 'medium' : 'hard'">
    <Card
      v-for="(card, index) in board"
      :key="`${card.language}-${card.type}`"
      :index="index"
      :language="card.language"
      :type="card.type"
      :isFlipped="card.isFlipped"
      @flip="flip"
    />
  </section>
</template>

<style>
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #f2f2f2;
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
.hard.hard {
  grid-template-columns: 14rem 14rem 14rem 14rem 14rem 14rem;
  grid-template-rows: 8rem 8rem 8rem 8rem 8rem 8rem;
}
</style>
