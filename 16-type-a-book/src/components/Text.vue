<script>
export default {
    name: 'Text',
    props: {
        state: Number,
        previous: Array,
        current: String,
        incorrect: Object,
        next: Array
    }
}
</script>

<template>
    <section class="text-wrapper">
        <div class="text">
            <div class="previous">
                <div class="char-wrapper">
                    <span v-for="(char, i) in previous"
                        :class="char === '\n' ? 'newline' : char === ' ' ? 'space' : ''" :key="`prev-${i}`">
                        {{ char === '\n' ? '¶' : char === ' ' ? '•' : char }}
                    </span>
                </div>
            </div>
            <div class="current" :class="`${state === -1 ? 'incorrect' : ''}`">
                <span :class="current === 'Enter' ? 'newline' : current === ' ' ? 'space' : ''">
                    {{ current === 'Enter' ? '¶' : current === ' ' ? '•' : current }}
                </span>
                <div class="incorrect-key" v-for="key in Object.values(incorrect)" :key="`incorrect-${key.id}`">
                    {{ key.key }}
                </div>
            </div>
            <div class="next">
                <div class="char-wrapper">
                    <span v-for="(char, i) in next"
                        :class="char === '\n' ? 'newline' : char === ' ' ? 'space' : ''" :key="`next-${i}`">
                        {{ char === '\n' ? '¶' : char === ' ' ? '•' : char }}
                    </span>
                </div>
            </div>
            <div class="shadow"></div>
        </div>
    </section>
</template>

<style scoped>
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
    position: relative;
    margin-bottom: 0.5rem;
    }
    .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    overflow: hidden;
    }
    .shadow::after {
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
    position: relative;
    }
    .incorrect-key {
    position: absolute;
    left: 0;
    top: 100%;
    background-color: #d55b60;
    color: #ffdcd9;
    border-radius: 0.25rem;
    animation: easeout 1s ease-out;
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
    .newline, .space {
    color: #00000044;
    }
    .current .newline, .current .space {
    color: #008ada66;
    }
    .current.incorrect .newline, .current.incorrect .space {
    color: #d55b6066;
    }
    @keyframes easeout {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(1rem);
    }
    }
</style>