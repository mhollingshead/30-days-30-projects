<h1 align="center">Solar System Visualization</h1>

*A true to scale visualization of our solar system using scrolling.*

<img src="assets/img/sample.gif" style="width: 100%; border-radius: 4px;" />

### [Try it out here!](https://mhollingshead.github.io/30-days-30-projects/11-solar-system-visualization/)

### Tech Stack

* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="16" height="16" /> JavaScript
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="16" height="16" /> HTML
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="16" height="16" /> CSS
* [Sweet Scroll](https://tsuyoshiwada.github.io/sweet-scroll/)

## Implementation

The concept for this project is based on some similar scrollers that visualize the distance between Earth and Earth's Moon (I'm unable to locate them at the moment). The styling and texture maps used for the planets were adapted from [this codepen](https://codepen.io/robdimarzo/pen/LMOLer).

> **NOTE**: this site heavily relies on `onScroll` listeners, autoscroll libraries, and extremely large document heights. Some browsers (Safari, for example) may not be able to handle it as many browsers have maximum page heights. So far, it's only been tested on Chrome.

The idea was to create a scale replica of our solar system where the size of each planet and distance between them is represented by some pixel scale. By default, 2,000 pixels is equal to 1,000,000 km (though this scale can be adjusted by the user).

We'll dynamically render and style each planet using the following data:

```javascript
const planets = {
    sun: {
        diameter: 1.393,
        distance: 0,
        tilt: 0,
        day: 600,
        glow: '#cc9f4c'
    },
    mercury: {
        diameter: 0.005,
        distance: 58,
        tilt: 0.034,
        day: 1407.6,
        glow: '#999999'
    },
    venus: {
        diameter: 0.012,
        distance: 108,
        tilt: 177.3,
        day: 5832.5,
        glow: '#e8cda2'
    },
    earth: {
        diameter: 0.013,
        distance: 150,
        tilt: 23.26,
        day: 23.9,
        glow: '#b3caff'
    },
    mars: {
        diameter: 0.007,
        distance: 228,
        tilt: 25.2,
        day: 24.6,
        glow: '#c07158'
    },
    jupiter: {
        diameter: 0.140,
        distance: 778,
        tilt: 3.1,
        day: 9.9,
        glow: '#c9b5a4'
    },
    saturn: {
        diameter: 0.116,
        distance: 1427,
        tilt: 26.7,
        day: 10.7,
        glow: '#f0e2c4'
    },
    uranus: {
        diameter: 0.051,
        distance: 2871,
        tilt: 97.8,
        day: 17.2,
        glow: '#b8d8e1'
    },
    neptune: {
        diameter: 0.050,
        distance: 4497,
        tilt: 28.3,
        day: 16.1,
        glow: '#5e73bb'
    }
};
```

### Planet Positioning

`diameter` and `distance` are stored in units equal to 1,000,000 km, or `1 * scale`. Planets are positioned relative to the sun, which always ends at `50vh`. So, each planet is `absolute`ly positioned at `y = planet.distance * scale + 50vh`.

### Scroll Behavior

The main point of the visualization is the autoscroller that takes the user from planet to planet. To easily scroll to the correct location, each planet has an anchor element that is also `absolute`ly positioned at `y = planet.distance * scale`. This way, when we scroll to the `y` position of a planet's anchor element, the planet will be vertically centered in the viewport.

`window.scrollTo` is not enough in this case, since we want to limit the autoscroller to a specific `speed`, which is another value that can be customized by the user. By default, the average scroll speed is 30,000,000 km/s.

Instead, we use the scroll library [sweetscroll.js](https://tsuyoshiwada.github.io/sweet-scroll/), which allows you to scroll to a certain position in a certain `duration`. The autoscroller scrolls to a destination using an `easeInOutSine` function, rather than a linear scroll. As a result, we can only choose an *average* scroll speed rather than a max scroll speed.

So, when we scroll to a planet from some scroll position, we have some calculations to do in order to tell Sweet Scroll how long the scroll should take. First we get the vertical distance from the current scroll position of the `target` we'd like to scroll to:

```javascript
const scroll = target.getBoundingClientRect().y;
```

Next we convert the `speed` (which is in km per ms) to px per ms

```javascript
const speedPxPerMs = kmToPx(speed);
```

So to travel `scroll` px at an average speed of `speedPxPerMs`, our duration should be:

```javascript
const duration = Math.abs(scroll / pxSpeedMs);
```

### Scroll Monitoring

The stats component in the bottom-left corner contains some information about distance away from the sun and the current scroll speed (whether the scroll is initiated by the user or Sweet Scroll). To update these values, we declare two functions, `handleScrollStep` and `handleScrollEnd`.

`handleScrollStep` will be used to handle each `onScroll` event. It calculates the distance from the sun / scroll speed and updates any relevant values in state:

```javascript
const handleScrollStep = time => {
    // The current distance from the sun in px
    const distancePx = document.documentElement.scrollTop;
    // The distance traveled since the last scroll step in px
    const distanceTraveledPx = Math.abs(distancePx - state.stats.distance);
    // The time elapsed since the last scroll step
    const timeSinceLastStepMs = (time - state.stats.lastStep);
    // The scroll speed in px per ms
    const scrollSpeedPxMs = distanceTraveledPx / timeSinceLastStepMs;
    // Update the state with the new distance, lastStep, and scrollSpeed
    state.stats.scrollSpeed = scrollSpeedPxMs;
    state.stats.distance = distancePx;
    state.stats.lastStep = time;
    // Update the stats component
    updateStats();
}
```

On each scroll event, we save the current time and distance in state, so that for future scroll events we can make a note of how long it's been since the previous step and how far we've traveled. We use these values to calculate the `scrollSpeed` in px per ms. The values are converted to `km` and `km per second` in the `updateStats` function.

`handleScrollEnd` will simply reset the `scrollSpeed` to `0` and update the final `distance`:

```javascript
const handleScrollEnd = () => {
    // When the scroll has completed, set the scroll speed to 0
    state.stats.scrollSpeed = 0;
    // Set the distance to the final post-scroll value
    state.stats.distance = document.documentElement.scrollTop;
    // Update the stats component
    updateStats();
}
```

In order to listen for scroll end, we set a timeout each time the `window.onScroll` event fires, clearing the previous timeout. If there's every a period of `50ms` without a scroll event, we assume the scroll has finished:

```javascript
let scrollStopTimeout;
// Listen for scroll steps, and handle accordingly
window.addEventListener('scroll', () => {
    handleScrollStep(new Date());
    // Use setTimeout to determine when the scroll has ended, then handle accordingly
    clearTimeout(scrollStopTimeout);
    scrollStopTimeout = setTimeout(handleScrollEnd, 50);
});
```