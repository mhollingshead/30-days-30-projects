<script>
import { getKeyboard } from '../common/utils';

export default {
    name: 'Keyboard',
    data() {
        return {
            keyboard: getKeyboard()
        }
    },
    props: {
        state: Number,
        current: String
    },
    methods: {
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

    },
    mounted() {
        window.addEventListener('keydown', e => {
            if (e.key === this.current) {
                this.$emit('handleCorrectInput');
            } else if (e.key.length === 1 || e.key === 'Enter') {
                this.$emit('handleIncorrectInput', e.key);
            }
            const key = this.getKey(e.code);
            key.active = true;
        });
        window.addEventListener('keyup', e => {
            const key = this.getKey(e.code);
            key.active = false;
        });
    }
}
</script>

<template>
    <section class="keyboard-wrapper">
        <div class="keyboard">
            <div class="keyboard-row" v-for="(row, i) in keyboard" :key="`row-${i}`">
                <div class="keyboard-keygroup" v-for="(keygroup, j) in row" :key="`keygroup-${i}-${j}`">
                    <div class="keyboard-key" v-for="(key, k) in keygroup" :key="`key-${i}-${j}-${k}`"
                        :class="`width-${key.width || 1} align-${key.align || ''} justify-${key.justify || ''} ${key.size || ''} ${key.active && state === -1 ? 'incorrect' : key.active ? 'active' : ''}`">
                        <span class="key-label">{{ key.chars[0] }}</span>
                        <span class="key-label" v-if="key.chars[1]">{{ key.chars[1] }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .keyboard-wrapper {
        padding: 1rem 0;
        margin: 0 auto;
        width: 61.25rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
</style>