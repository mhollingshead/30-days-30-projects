<script>
import { codes, fileNames, icons, autoHighlight } from '../common/constants';

export default {
  name: 'Card',
  props: {
    index: Number,
    language: String,
    type: String,
    isFlipped: Boolean,
    isMatched: Boolean
  },
  methods: {
    getIcon() {
      return icons[this.language];
    },
    getCode() {
      return codes[this.language];
    },
    getFileName() {
      return fileNames[this.language];
    },
    shouldAutoHighlight() {
      return autoHighlight[this.language];
    }
  }
}
</script>

<template>
  <div class="card" @click="$emit('flip', index)" :class="isFlipped || isMatched ? 'flipped' : ''">
    <div class="face front">
      <img v-if="type === 'icon'" :src="getIcon()" class="logo" :title="language" />
      <div class="content" v-else>
        <p class="file-name">{{ getFileName() }}</p>
        <pre class="code"><code :class="shouldAutoHighlight() ? '' : `language-${language}`">{{ getCode() }}</code></pre>
      </div>
    </div>
    <div class="face back">
      <span class="secondary">&gt;&nbsp;</span>
      Hello, Match!
    </div>
  </div>
</template>

<style scoped>
  .card {
    position: relative;
    cursor: pointer;
    transition: 0.25s transform ease-in;
    transform-style: preserve-3d;
  }
  .card.flipped {
    transform: rotateY(180deg);
  }
  .face {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    backface-visibility: hidden;
  }
  .front {
    border: 1px solid #cecece;
    background-color: #fff;
    transform: rotateY(180deg);
  }
  .back {
    border: 1px solid #000;
    background-color: #333;
    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
    color: white;
    font-size: 0.625rem;
  }
  .secondary {
    color: #3fffe2;
  }
  .logo {
    height: 80%;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .code {
    font-size: 0.625rem;
    overflow-x: scroll;
    width: 100%;
    height: 100%;
  }
  .file-name {
    width: 100%;
    color: grey;
    font-size: 0.625rem;
  }

  .hljs {
    background-color: #fafafa;
    border-radius: 0.25rem;
    height: 100%;
  }
</style>
