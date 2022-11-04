<script>
    const pad = (digit, places) => {
        // If the number of digits are already > places, return the digits as string
        if (String(digit).length > places) return String(digit);
        // Otherwise, prepend the proper number of 0s and slice
        return (new Array(places - 1).fill('0').join('') + digit).slice(-places);
    }

    const getFirstUnusedInt = ints => {
        const intSet = new Set(ints);
        let int = 1;
        // Use Set.has to check for the first unused int
        while (intSet.has(int)) int++
        return int;
    }

    const formatMs = ms => {
        // Format ms to ...dd?:hh?:mm:ss.ms
        const d = Math.floor(ms / 86400000);
        ms -= d * 86400000;
        const h = Math.floor(ms / 3600000);
        ms -= h * 3600000;
        const m = Math.floor(ms / 60000);
        ms -= m * 60000;
        const s = Math.floor(ms / 1000);
        ms -= s * 1000;
        ms = Math.floor(ms / 10);
        // Use ternary to only render days and hours if they are > 0
        return d ? `${pad(d, 2)}:${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 2)}`
        : h ? `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 2)}`
        : `${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 2)}`;
    }

    const getTimestamp = () => Number(new Date());

    export default {
        name: 'Timers',
        data() {
            // In state, we store our array of timers and our interval, which will update the times
            return {
                timers: JSON.parse(localStorage.getItem('timers')) || [],
                interval: null
            }
        },
        methods: {
            getTimer(id) {
                // Find the timer with the proper id and return it
                return this.timers.find(timer => timer.id === id);
            },
            addTimer() {
                // Add a new timer object to the timer array
                this.timers.push({
                    id: getTimestamp(),
                    timeBank: 0,
                    start: null,
                    end: null,
                    paused: true,
                    name: `Timer ${
                        getFirstUnusedInt(
                            this.timers.map(timer => parseInt(timer.name.replace('Timer ', '')))
                        )
                    }`
                });
            },
            removeTimer(id) {
                // Filter out the timer to be removed
                this.timers = this.timers.filter(timer => timer.id !== id);
            },
            pauseTimer(id) {
                const timer = this.getTimer(id);
                // Add the ms for the current timing session to the time bank
                timer.timeBank += getTimestamp() - timer.start;
                // Reset the start and end times
                timer.start = null;
                timer.end = null;
                // Mark the timer as paused
                timer.paused = true;
            },
            startTimer(id) {
                const timer = this.getTimer(id);
                // Mark the timer as unpaused
                timer.paused = false;
                // Set the start date for this timing session
                timer.start = getTimestamp();
            },
            setName(id, name) {
                // Update the name of the timer
                this.getTimer(id).name = name;
            },
            formatTime(ms) {
                return formatMs(ms);
            }
        },
        beforeMount() {
            // Set the time increment interval
            this.interval = setInterval(() => {
                this.timers.forEach(timer => {
                    // Update the end time for each non-paused timer to be the current time
                    // Times are calculated by taking timer.timeBank + (timer.end - timer.start)
                    if (!timer.paused) timer.end = getTimestamp();
                });
            }, 10);

            // On before window unload
            window.addEventListener('beforeunload', () => {
                // Clear the time increment interval
                clearInterval(this.interval);
                // Save timer states in local storage for next session
                localStorage.setItem('timers', JSON.stringify(this.timers));
            });
        }
    }
</script>

<template>
    <ul class="timers">
        <li v-for="timer in timers" :key="timer.id" class="timer">
            <div class="timer-head">
                <h4 class="timer-name" @input="e => setName(timer.id, e.target.innerText)" contenteditable spellcheck="false">{{ timer.name }}</h4>
                <div v-if="timer.paused" class="timer-tag">Paused</div>
            </div>
            <div class="time">
                <span>{{ this.formatTime(timer.timeBank + (timer.start && timer.end ? timer.end - timer.start : 0)) }}</span>
            </div>
            <div class="timer-foot">
                <button v-if="timer.paused" @click="startTimer(timer.id)" class="start-button">Start</button>
                <button v-else @click="pauseTimer(timer.id)" class="pause-button">Pause</button>
                <button @click="removeTimer(timer.id)" class="delete-button">Remove</button>
            </div>
        </li>
        <li class="add" @click="addTimer">
            <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" style="fill: currentColor">
                <path fill-rule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
            </svg>
            <span>New Timer</span>
        </li>
    </ul>
</template>

<style scoped>
    .timers {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        gap: 1rem;
        padding: 1rem;
        max-width: calc(18rem * 3 + 2rem + 2rem);
        margin: 1rem auto;
    }
    .timer, .add {
        width: 18rem;
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
    }
    .timer {
        background-color: var(--color-bg-primary);
        border: 1px solid var(--color-border-primary);
        flex-direction: column;
    }
    .add {
        background-color: var(--color-btn-bg-primary);
        border: 1px dashed var(--color-btn-border-primary);
        color: var(--color-fg-muted);
        cursor: pointer;
        gap: 0.5rem;
    }
    .add:hover {
        background-color: var(--color-btn-bg-primary-hover);
        border: 1px dashed var(--color-btn-border-primary);
        color: var(--color-fg-primary);
    }
    .timer-head, .timer-foot {
        padding: 1rem;
    }
    .timer-head {
        width: 100%;
        color: var(--color-fg-primary);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .timer-foot {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .timer-name {
        font-weight: 500;
    }
    .timer-tag {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
    }
    .time {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: 200;
        font-family: 'Roboto Mono', monospace;
        color: var(--color-fg-primary);
    }
    .start-button, .pause-button, .delete-button {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
    }
    .start-button {
        background-color: var(--color-btn-bg-green);
        border: 1px solid var(--color-btn-border-primary);
        color: var(--color-btn-text-green);
    }
    .start-button:hover {
        background-color: var(--color-btn-bg-green-hover);
    }
    .pause-button {
        background-color: var(--color-btn-bg-primary);
        border: 1px solid var(--color-btn-border-primary);
        color: var(--color-btn-text-primary);
    }
    .pause-button:hover {
        background-color: var(--color-btn-bg-primary-hover);
    }
    .delete-button {
        background-color: var(--color-btn-bg-primary);
        border: 1px solid var(--color-btn-border-primary);
        color: var(--color-btn-text-red);
    }
    .delete-button:hover {
        background-color: var(--color-btn-bg-red-hover);
        border: 1px solid var(--color-btn-border-red-hover);
        color: var(--color-btn-text-green);
    }
</style>