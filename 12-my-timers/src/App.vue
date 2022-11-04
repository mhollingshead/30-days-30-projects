<script>
import Timers from './components/Timers.vue';

export default {
  name: 'App',
  components: {
    Timers
  }
}
</script>

<template>
  <Timers />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (prefers-color-scheme: light) {
  html {
    --color-bg-primary: #ffffff;
    --color-bg-muted: #f6f8fa;
    --color-bg-hover: #ecf1f4;
    --color-fg-primary: #24292f;
    --color-fg-muted: #57606a;
    --color-border-primary: #d0d7de;
    --color-border-muted: hsla(210,18%,87%,1);
    --color-btn-bg-primary: #f6f8fa;
    --color-btn-bg-primary-hover: #f3f4f6;
    --color-btn-bg-red-hover: #a40e26;
    --color-btn-bg-green: #2da44e;
    --color-btn-bg-green-hover: #2c974b;
    --color-btn-border-primary: rgba(27,31,36,0.15);
    --color-btn-border-red-hover: rgba(27,31,36,0.15);
    --color-btn-text-primary: #24292f;
    --color-btn-text-green: #ffffff;
    --color-btn-text-red: #cf222e;
    --color-btn-text-red-hover: #ffffff;
  }
}

@media (prefers-color-scheme: dark) {
  html {
    --color-bg-primary: #0d1117;
    --color-bg-muted: #161b22;
    --color-bg-hover: #131921;
    --color-fg-primary: #c9d1d9;
    --color-fg-muted: #8b949e;
    --color-border-primary: #30363d;
    --color-border-muted: #8b949e;
    --color-btn-bg-primary: #21262d;
    --color-btn-bg-primary-hover: #30363d;
    --color-btn-bg-green: #238636;
    --color-btn-bg-green-hover: #2ea043;
    --color-btn-bg-red-hover: #da3633;
    --color-btn-border-primary: rgba(240,246,252,0.1);
    --color-btn-border-primary-hover: #8b949e;
    --color-btn-border-red-hover: #f85149;
    --color-btn-text-primary: #c9d1d9;
    --color-btn-text-green: #ffffff;
    --color-btn-text-red: #f85149;
    --color-btn-text-red-hover: #ffffff;
  }
}

body {
  background-color: var(--color-bg-muted);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
