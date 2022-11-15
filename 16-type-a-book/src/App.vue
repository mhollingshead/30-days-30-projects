<script>
import Keyboard from './components/Keyboard.vue';
import Chapter from './components/Chapter.vue';
import Header from './components/Header.vue';
import Text from './components/Text.vue';
import chapters from './data/chapters.json';
import books from './data/books.json';

const BUFFER = 40;

export default {
  name: 'App',
  components: {
    Text,
    Header,
    Chapter,
    Keyboard
  },
  data() {
    // Load position data from localStorage
    const positions = JSON.parse(localStorage.getItem('tab-positions')) || {};
    // Load the current book's title from localStorage
    const title = JSON.parse(localStorage.getItem('tab-book')) || 'The Strange Case of Dr. Jekyll and Mr. Hyde';
    // Get the book data from books.json (title / author)
    const book = books.find(book => book.title === title);
    // Get the initial positions (chapter index / char index)
    const position = {
      chapter: positions[title]?.chapter || 0,
      char: positions[title]?.position || 0
    }
    // Get the current chapter data from chapters.json (title / text)
    const chapter = chapters[title][position.chapter];
    // Split chapter text into individual characters
    const chars = chapter.text.split('');
    // Set initial text display state (previous chars, current char, next chars, incorrect chars)
    const text = {
      previous: [],
      current: '',
      incorrect: {},
      next: []
    }

    return { state: 0, positions, book, position, chapter, chars, text }
  },
  methods: {
    savePosition(book, chapter, position) {
      // Update the positions object
      const positions = {
        ...this.positions,
        [book]: {
          chapter: chapter,
          position: position
        }
      };
      // Update the necessary items in local storage
      localStorage.setItem('tab-book', JSON.stringify(book));
      localStorage.setItem('tab-positions', JSON.stringify(positions));
      // Save the updated positions in state
      this.positions = positions;
    },
    setChars() {
      this.text = {
        // Set the chars to the left of the current char
        previous: this.chars.slice(
          Math.max(this.position.char - BUFFER, 0), 
          this.position.char
        ),
        // Set the current char
        current: this.chars[this.position.char] === '\n' ? 'Enter' : this.chars[this.position.char],
        // Set the chars to the right of the current char
        next: this.chars.slice(
          this.position.char + 1, 
          Math.min(this.position.char + 1 + BUFFER, this.chars.length)
        )
      }
    },
    handleBookSelection(title) {
      // Save the position for the current book
      this.savePosition(this.book.title, this.position.chapter, this.position.char);
      // Update the new book in state
      this.book = books.find(book => book.title === title);
      // Set the initial chapter and char positions for the new book
      this.position = {
        chapter: this.positions[title]?.chapter || 0,
        char: this.positions[title]?.position || 0
      };
      // Set the current chapter for the new book
      this.chapter = chapters[title][this.position.chapter];
      // Set the char array for the current chapter of the new book
      this.chars = this.chapter.text.split('');
      // Set the displayed char arrays
      this.setChars();
    },
    handleChapterCompletion() {
      // Increment the chapter position
      this.position.chapter++;
      // Set the char position to 0
      this.position.char = 0;
      // Set the new current chapter
      this.chapter = chapters[this.book.title][this.position.chapter];
      // Set the char array for the new current chapter
      this.chars = this.chapter.text.split('');
      // Set the displayed char arrays
      this.setChars();
    },
    handleCorrectInput() {
      // Non-incorrect state is 0
      this.state = 0;
      // Increment the char position
      const char = this.position.char + 1;
      // If the chapter is finished, handle chapter completion
      if (char === this.chars.length) {
        this.handleChapterCompletion();
      } else {
        // Otherwise, update the new char position
        this.position.char = char;
        // Set the displayed char arrays
        this.setChars();
      }
    },
    handleIncorrectInput(key) {
      // Incorrect state is -1
      this.state = -1;
      // We only want to render incorrect chars for 1 second,
      // so to make destroying easier, we index them by a unique id (a timestamp)
      const id = Number(new Date());
      // Set the displayed character (replace key with symbol of necessary)
      key = key === 'Enter' ? '¶' : key === ' ' ? '•' : key;
      // Add the incorrect character to the incorrect object
      this.text.incorrect[id] = { key, id };
      // Destroy the incorrect character in 1 second
      setTimeout(() => delete this.text.incorrect[id], 1000);
    }
  },
  mounted() {
    // Set the initial displayed char arrays
    this.setChars();
    // Before unload, save the current position in localStorage
    window.addEventListener('beforeunload', () => {
      this.savePosition(this.book, this.chapter, this.position);
    });
  }
}
</script>

<template>
  <Header
    :title="book.title"
  />
  <Chapter 
    :title="chapter.title" 
    :chapter="position.chapter" 
    :totalChapters="book.totalChapters" 
    :char="position.char" 
    :totalChars="chars.length" 
  />
  <Text 
    :previous="text.previous" 
    :current="text.current" 
    :incorrect="text.incorrect" 
    :next="text.next" 
  />
  <Keyboard 
    :state="state" 
  />
</template>

<style>
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Trebuchet MS', sans-serif;
}
</style>
