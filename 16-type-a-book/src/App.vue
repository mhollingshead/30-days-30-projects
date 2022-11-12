<script>
import { getKeyboard } from './common/utils';
import { books } from './common/data';

const BUFFER = 42;

export default {
  name: 'App',
  data() {
    const positions = JSON.parse(localStorage.getItem('tab-positions')) || {};
    const book = JSON.parse(localStorage.getItem('tab-book')) || 'The Strange Case of Dr. Jekyll and Mr. Hyde';
    const position = positions[book]?.position || 0;
    const chapter = positions[book]?.chapter || 0;
    const chapterTitle = books[book].chapters[chapter].title;
    const totalChapters = books[book].chapters.length;
    const chars = books[book].chapters[chapter].text.split('');
    return {
      keyboard: getKeyboard(),
      state: 0,
      book,
      chapter,
      chapterTitle,
      totalChapters,
      positions,
      position,
      chars,
      current: [],
      previous: [],
      next: []
    }
  },
  methods: {
    savePosition(book, chapter, position) {
      const positions = {
        ...this.positions,
        [this.book]: {
          chapter: chapter,
          position: position
        }
      };
      localStorage.setItem('tab-book', JSON.stringify(book));
      localStorage.setItem('tab-positions', JSON.stringify(positions));
      this.positions = positions;
    },
    getKey(code) {
      for (let i = 0; i < this.keyboard.length; i++) {
        for (let j = 0; j < this.keyboard[i].length; j++) {
          for (let k = 0; k < this.keyboard[i][j].length; k++) {
            if (this.keyboard[i][j][k].code === code) {
              return this.keyboard[i][j][k];
            }
          }
        }
      }
    },
    setChars() {
      const current = this.chars[this.position];
      this.current = current === '\n' ? 'Enter' : current;
      const previous = this.chars.slice(Math.max(this.position - BUFFER, 0), this.position);
      this.previous = previous;
      const next = this.chars.slice(this.position + 1, Math.min(this.position + 1 + BUFFER, this.chars.length));
      this.next = next;
    },
    handleBookSelection(book) {
      this.savePosition(this.book, this.chapter, this.position);
      this.book = book;
      const position = this.positions[book]?.position || 0;
      this.position = position;
      const chapter = this.positions[book]?.chapter || 0;
      this.chapter = chapter;
      this.chapterTitle = books[book].chapters[chapter].title;
      this.totalChapters = books[book].chapters.length;
      this.chars = books[book].chapters[chapter].text.split('');
      this.setChars();
    },
    handleChapterCompletion() {
      this.chapter++;
      this.position = 0;
      this.chapterTitle = books[this.book].chapters[this.chapter].title;
      this.chars = books[this.book].chapters[this.chapter].text.split('');
      this.setChars();
    },
    handleCorrectInput() {
      this.state = 0;
      const position = this.position + 1;
      if (position === this.chars.length) {
        this.handleChapterCompletion();
      } else {
        this.position = position;
        this.setChars();
      }
    },
    handleIncorrectInput() {
      this.state = -1;
    }
  },
  mounted() {
    this.setChars();
    window.addEventListener('keydown', e => {
      if (e.key === this.current) {
        this.handleCorrectInput();
      } else if (e.key.length === 1 || e.key === 'Enter') {
        this.handleIncorrectInput();
      }
      const key = this.getKey(e.code);
      key.active = true;
    });
    window.addEventListener('keyup', e => {
      const key = this.getKey(e.code);
      key.active = false;
    });
    window.addEventListener('beforeunload', () => this.savePosition(this.book, this.chapter, this.position));
  }
}
</script>

<template>
  <header class="header">
    <div class="book-options"></div>
    <div class="metadata">
      <select class="book-title" @input="e => handleBookSelection(e.target.value)">
        <option :selected="book === `Alice's Adventures in Wonderland`">
          Alice's Adventures in Wonderland
        </option>
        <option :selected="book === 'The Call of the Wild'">
          The Call of the Wild
        </option>
        <option :selected="book === 'Jane Eyre'">
          Jane Eyre
        </option>
        <option :selected="book === 'The Strange Case of Dr. Jekyll and Mr. Hyde'">
          The Strange Case of Dr. Jekyll and Mr. Hyde
        </option>
        <option :selected="book === 'The Time Machine'">
          The Time Machine
        </option>
      </select>
    </div>
    <div class="site-options"></div>
  </header>
  <section class="chapter-wrapper">
    <h2 class="chapter-number">Chapter {{ chapter + 1 }} of {{ totalChapters }}</h2>
    <h1 class="chapter-title">{{ chapterTitle }}</h1>
    <div class="progress">
      {{ position }} / {{ chars.length }}
      <span class="progress-percent">({{ (position / chars.length * 100).toFixed(2) }}%)</span>
    </div>
  </section>
  <section class="text-wrapper">
    <div class="text">
      <div class="previous">
        <div class="char-wrapper">
          <span v-for="(char, i) in previous" :class="char === '\n' ? 'newline' : char === ' ' ? 'space' : ''" :key="`prev-${i}`">
            {{ char === '\n' ? '¶' : char === ' ' ? '•' : char }}
          </span>
        </div>
      </div>
      <div class="current" :class="`${state === -1 ? 'incorrect' : ''}`">
        <span :class="current === 'Enter' ? 'newline' : current === ' ' ? 'space' : ''">
          {{ current === 'Enter' ? '¶' : current === ' ' ? '•' : current }}
        </span>
      </div>
      <div class="next">
        <div class="char-wrapper">
          <span v-for="(char, i) in next" :class="char === '\n' ? 'newline' : char === ' ' ? 'space' : ''" :key="`next-${i}`">
            {{ char === '\n' ? '¶' : char === ' ' ? '•' : char }}
          </span>
        </div>
      </div>
    </div>
  </section>
  <section class="keyboard-wrapper">
    <div class="keyboard">
      <div class="keyboard-row" v-for="(row, i) in keyboard" :key="`row-${i}`">
        <div class="keyboard-keygroup" v-for="(keygroup, j) in row" :key="`keygroup-${i}-${j}`">
          <div class="keyboard-key" v-for="(key, k) in keygroup" :key="`key-${i}-${j}-${k}`" :class="`width-${key.width || 1} align-${key.align || ''} justify-${key.justify || ''} ${key.size || ''} ${key.active && state === -1 ? 'incorrect' : key.active ? 'active' : ''}`">
            <span class="key-label">{{ key.chars[0] }}</span>
            <span class="key-label" v-if="key.chars[1]">{{ key.chars[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.header {
  margin: 1rem auto;
  width: 61.25rem;
  display: flex;
  justify-content: space-between;
}
.chapter-wrapper {
  margin: 2rem auto;
  width: 61.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.book-title {
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25rem;
  border: none;
  outline-color: #008ada;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center;
}
.book-title:hover {
  border: 1px solid #cecece;
  cursor: pointer;
}
.progress {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
}
.progress-percent {
  color: grey;
}
.chapter-number {
  font-weight: 400;
  font-size: 1rem;
  color: grey;
}
.chapter-title {
  font-weight: 700;
}
.text-wrapper {
  width: 61.25rem;
  margin: 1rem auto;
}
.text {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  border-radius: 0.25rem;
  width: 61.25rem;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  font-size: 1.25rem;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.5rem;
}
.text::after {
  content: "";
  position: absolute;
  width: 61.25rem;
  height: 8rem;
  top: -3rem;
  box-shadow: inset 0 0 2rem 2rem #f2f2f2;
}
.previous, .next {
  width: 1px;
  height: calc(1.25rem + 4px);
  position: relative;
}
.char-wrapper {
  position: absolute;
  top: 0;
  width: 60rem;
}
.previous .char-wrapper {
  right: 0;
  text-align: right;
}
.next .char-wrapper {
  left: 0;
  text-align: left;
}
.next {
  opacity: 0.4;
}
.current {
  padding: 0.5rem 0;
}
.current.incorrect {
  background-color: #ffdcd9;
}
.current span {
  color: #008ada;
  border-bottom: 2px solid #008ada;
  border-top: 2px solid transparent;
}
.current.incorrect span {
  color: #d55b60;
  border-bottom: 2px solid #d55b60;
}
.keyboard-wrapper {
  padding: 1rem 0;
  margin: 0 auto;
  width: 61.25rem;
}
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.keyboard-row {
  display: flex;
  gap: 0.25rem;
}
.keyboard-keygroup {
  height: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.keyboard-key {
  width: 4rem;
  height: 100%;
  padding: 0.25rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cecece;
  border-radius: 0.25rem;
}
.align-flex-start {
  align-items: flex-start;
}
.align-flex-end {
  align-items: flex-end;
}
.justify-flex-start {
  justify-content: flex-end;
}
.justify-flex-end {
  justify-content: flex-start;
}
.justify-center {
  justify-content: center;
}
.width-1 {
  width: 4rem;
}
.width-2 {
  width: 5rem;
}
.width-3 {
  width: 6rem;
}
.width-4 {
  width: 7.125rem;
}
.width-5 {
  width: 9.25rem;
}
.width-6 {
  width: 21rem;
}
.small span:nth-child(1) {
  font-size: 0.875rem;
}
.keyboard-key.active {
  background-color: #f2f2f2;
}
.keyboard-key.incorrect {
  background-color: #ffdcd9;
}
.newline, .space {
  color: #00000044;
}
.current .newline, .current .space {
  color: #008ada66;
}
.current.incorrect .newline, .current.incorrect .space {
  color: #d55b6066;
}
</style>
