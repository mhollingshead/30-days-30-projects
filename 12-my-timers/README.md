<h1 align="center">My Timers</h1>

*A time management app where users can add and remove timers. Both active and paused timers persist session to session using local storage.*

<img src="assets/img/sample.png" style="width: 100%; border-radius: 4px;" />

### [Try it out here!](https://mhollingshead.github.io/30-days-30-projects/12-my-timers/build/)

### Tech Stack

* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="16" height="16" /> JavaScript
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" width="16" height="16" /> Vue.js
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="16" height="16" /> CSS

## Install and Run

1. Download / navigate to the `/12-my-timers` directory.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm run serve`.

By default, the app should be accessible at [http://localhost:8080](http://localhost:8080).

## Implementation
As this is a "HelloVue" project, the functionality is fairly simple and the app is limited to a single component in order to focus on learning the syntax and "Vue-isms".

Our state stores two variables: `timers` (an array of timer objects), and `interval` (an interval used to update each active timer's time). Timer objects contain the following attributes:

* `id`, a unique id (equal to the unix timestamp when the timer was created), 
* `start`, a timestamp representing the date/time of the start of the timer's current timing session,
* `end`, a timestamp representing the most recent date/time that the timer was active,
* `timeBank`, the number of ms that the timer spent active during previous sessions,
* `paused`, a boolean indicating whether the timer is paused or active, and
* `name`, the name of the timer, which can be changed by the user.

We have several basic methods that timers and the timer array: `getTimer(id)`, `addTimer()`, `removeTimer(id)`, and `setName(id, name)`. These are fairly standard and simply update the state with the relevant information.

Our state is initialized by loading the array of timer objects from `localStorage`:

```javascript
data() {
    return {
        timers: JSON.parse(localStorage.getItem('timers')) || [],
        interval: null
    }
},
```

Our `beforeMount` function sets our timer interval and also sets a `window.onbeforeunload` listener, which clears the interval and saves the state in `localStorage` before the user exits or reloads the page:

```javascript
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
```

Our timer interval loops through our array of timers, checking to see if they are active (i.e. `timer.paused === false`). If so, it updates the timer's `end` value, which is used to calculate the timer's current time:

```vue
<div class="time">
    <span>{{
        this.format(timer.timeBank + (timer.start && timer.end ? timer.end - timer.start : 0))
    }}</span>
</div>
```

When we display the time, we take the ms stored in the timer's `timeBank`, and if both `timer.start` and `timer.end` are defined, we subtract end from start to get the additional ms the timer has been running for the current timing session and add the result to get the total time.

Our final two methods, `startTimer` and `pauseTimer`, toggle whether or not the timer is active:


```javascript
startTimer(id) {
    const timer = this.getTimer(id);
    // Mark the timer as unpaused
    timer.paused = false;
    // Set the start date for this timing session
    timer.start = getTimestamp();
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
}
```

When we start a timer, we mark the timer as active and set the timer's `start` value to the current date timestamp. Because the timer is no longer `paused`, our timer interval will start assigning `end` values every 10ms and the time will update accordingly.

When we pause a timer, we add the total time spent active during this timing session to the timer's `timeBank`. Next, we set it's `start` and `end` values to `null` so the rendered time will be the timer's `timeBank` alone. Finally, we mark it as `paused` so the interval doesn't assign new `end` values until the timer is unpaused.

Because we store state in `localStorage` and calculate times based on `start` timestamps, the correct times will persist even when the tab is inactive or closed entirely. Likewise, `pause`d timers will remain paused across sessions.