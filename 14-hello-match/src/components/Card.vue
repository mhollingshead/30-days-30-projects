<script>
import { codes, fileNames, icons } from '../common/constants';

export default {
  name: 'Card',
  props: {
    index: Number,
    language: String,
    type: String,
    isFlipped: Boolean
  },
  methods: {
    getIcon() {
      return icons[this.language];
    },
    getCode() {
      return codes[this.language];
    },
    getFileName() {
      return fileNames[this.language]
    }
  }
}
</script>

<template>
  <div class="card" @click="$emit('flip', index)">
    <div v-if="isFlipped" class="face front">
      <img v-if="type === 'icon'" :src="getIcon()" class="logo" />
      <div class="content" v-else>
        <p class="file-name">{{ getFileName() }}</p>
        <pre class="code"><code :class="`language-${language}`">{{ getCode() }}</code></pre>
      </div>
    </div>
    <div v-else class="face back">Back</div>
  </div>
</template>

<style scoped>
  .card {
    position: relative;
    border: 2px solid #cecece;
    background-color: #fff;
    border-radius: 0.5rem;
  }
  .face {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    height: 80%;
  }
  .content {
    width: 100%;
    height: 100%;
  }
  .code {
    font-size: 0.625rem;
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    width: 100%;
  }
  .file-name {
    width: 100%;
    color: grey;
    font-size: 0.625rem;
  }
</style>
