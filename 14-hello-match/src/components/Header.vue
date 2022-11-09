<script>
export default {
    name: 'Header',
    props: {
        difficulty: Number
    }
}
</script>

<template>
    <header class="header" :class="difficulty == 0 ? 'easy' : difficulty == 1 ? 'medium' : 'hard'">
        <div class="logo"><span class="secondary">&gt;</span> Hello, Match!</div>
        <div class="options">
            <select @input="$emit('changeDifficulty', $event.target.value)" class="select">
                <option value="0" :selected="difficulty === 0">Easy</option>
                <option value="1" :selected="difficulty === 1">Medium</option>
                <option value="2" :selected="difficulty === 2">Hard</option>
            </select>
            <button @click="$emit('newGame')" class="button">New Game</button>
        </div>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 28.5rem;
    padding: 1rem 0;
    margin: 0 auto;
}

.header.easy {
    width: calc(14rem * 2 + 0.5rem * 1);
}

.header.medium {
    width: calc(14rem * 4 + 0.5rem * 3);
}

.header.hard {
    width: calc(14rem * 6 + 0.5rem * 5);
}

.logo {
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    color: #333;
}

.secondary {
    color: #00a58c;
}

.options {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.button {
    background-color: #00cdae;
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #00a58c;
    border-radius: 0.25rem;
    cursor: pointer;
    outline: none;
}

.select {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #cecece;
    border-radius: 0.25rem;
    cursor: pointer;
    outline: none;
}
</style>
