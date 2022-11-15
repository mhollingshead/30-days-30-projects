<script>
export default {
    name: 'Chapter',
    props: {
        title: String,
        chapter: Number,
        totalChapters: Number,
        char: Number,
        totalChars: Number
    }
}
</script>

<template>
    <section class="chapter-wrapper">
        <h2 class="chapter-number">Chapter {{ chapter + 1 }} of {{ totalChapters }}</h2>
        <h1 class="chapter-title">{{ title }}</h1>
        <div class="progress">
            {{ char }} / {{ totalChars }}
            <span class="progress-percent">({{ (char / totalChars * 100).toFixed(2) }}%)</span>
        </div>
    </section>
</template>

<style scoped>
    .chapter-wrapper {
    margin: 2rem auto;
    width: 61.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
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
    font-weight: 600;
    font-size: 1rem;
    color: #008ada;
    }
    .chapter-title {
    font-weight: 700;
    }
</style>