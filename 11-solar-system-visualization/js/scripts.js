const state = {
    scale: 2000,
    speed: 30000,
    stats: {
        distance: 0,
        lastStep: 0,
        scrollSpeed: 0
    }
};

const pxToKm = px => {
    // scale px = 1,000,000 km. 1 km = 1,000,000 / scale px
    const pxToKmRatio = 1000000 / state.scale;
    // y km = x px * 1,000,000 / scale px
    return px * pxToKmRatio;
}

const kmToPx = km => {
    // scale px = 1,000,000 km. 1 px = scale px / 1,000,000
    const kmToPxRatio = state.scale / 1000000;
    // y px = x km * scale px / 1,000,000
    return km * kmToPxRatio;
}

const updateStats = () => {
    // The distance from the sun in px
    const distancePx = state.stats.distance;
    // The distance from the sun to km
    const distanceKm = pxToKm(distancePx);
    // The scroll speed in km per ms
    const scrollSpeedKmMs = state.stats.scrollSpeed;
    // The scroll speed in km per s
    const scrollSpeedKmS = scrollSpeedKmMs * 1000;
    // Update the stat elements
    document.querySelector('#scroll-speed').innerHTML = parseInt(scrollSpeedKmS).toLocaleString();
    document.querySelector('#distance').innerHTML = parseInt(distanceKm).toLocaleString();
}

const handleScrollEnd = () => {
    // When the scroll has completed, set the scroll speed to 0
    state.stats.scrollSpeed = 0;
    // Set the distance to the final post-scroll value
    state.stats.distance = document.documentElement.scrollTop;
    // Update the stats component
    updateStats();
}

const handleScrollStep = time => {
    // The current distance from the sun in px
    const distancePx = document.documentElement.scrollTop;
    // The distance traveled since the last scroll step in px
    const distanceTraveledPx = Math.abs(distancePx - state.stats.distance);
    // The time elapsed since the last scroll step
    const timeSinceLastStepMs = (time - state.stats.lastStep);
    // The scroll speed in km per ms
    const scrollSpeedKmMs = pxToKm(distanceTraveledPx) / timeSinceLastStepMs;
    // Update the state with the new distance, lastStep, and scrollSpeed
    state.stats.scrollSpeed = scrollSpeedKmMs;
    state.stats.distance = distancePx;
    state.stats.lastStep = time;
    // Update the stats component
    updateStats();
}

// Initialize the scroller, which will handle autoscrolling a certain speed
const scroller = new SweetScroll({ 
    easing: 'easeInOutSine',
    before: () => {
        // Before autoscrolling, disable inputs
        document.querySelector('#scale').disabled = true;
        document.querySelector('#speed').disabled = true;
    },
    complete: () => {
        // Reenable inputs after autoscroll has completed
        document.querySelector('#scale').disabled = false;
        document.querySelector('#speed').disabled = false;
    }
}, document.documentElement);

let scrollStopTimeout;
// Listen for scroll steps, and handle accordingly
window.addEventListener('scroll', () => {
    handleScrollStep(new Date());
    // Use setTimeout to determine when the scroll has ended, then handle accordingly
    clearTimeout(scrollStopTimeout);
    scrollStopTimeout = setTimeout(handleScrollEnd, 50);
});

const renderPlanets = () => {
    // Clear the universe element
    const universe = document.querySelector('.universe');
    universe.innerHTML = '';

    // Render each planet
    Object.entries(planets).forEach(([name, data]) => {
        const diameter = state.scale * data.diameter;
        const distance = state.scale * data.distance;
        // Render the planet's anchor as well as the planet element. Planet elements include an atmosphere
        // and surface, which are all styled relative to each planet.
        universe.innerHTML += `
            <div id="${name}-anchor" class="anchor" style="top: ${distance - diameter * 0.5}px"></div>
            <div class="planet-wrapper" style="
                top: calc(50vh + ${distance}px); left: 50%; 
                transform: translateY(-100%) translateX(-50%)
            ">
                <div class="planet" style="${name === 'sun' ? '' : 'transform: rotate(90deg)'};">
                    <div class="planet-atmosphere" style="
                        width: ${diameter}px; 
                        height: ${diameter}px;
                        box-shadow: ${name !== 'sun'
                            ? `inset ${diameter * 0.052}px 0px ${diameter * 0.063}px -${diameter * 0.01}px rgba(255,255,255,.2),
                                inset -${diameter * 0.368}px 0px ${diameter * 0.263}px 0px black, 
                                -${diameter * 0.026}px 0px ${diameter * 0.052}px -${diameter * 0.021}px ${data.glow};`
                            : `0px 0px ${diameter * 0.052}px 0px ${data.glow}, 
                                0px 0px ${diameter * 3.263}px -${diameter * 0.01}px ${data.glow};`
                        }
                    ">
                        <div class="planet-surface" style="
                            background-image: url(assets/img/textures/${name}.jpeg);
                            transform: rotate(${data.tilt}deg) scale(1.2);
                            animation: planetRotate ${data.day}s linear infinite;
                        ">
                        </div>
                    </div>
                </div>
                <div class="measurement-container">
                    <div class="measurement">~${(data.diameter * 1000000).toLocaleString()} km</div>
                    <div class="measurement-lines"></div>
                </div>
                <div class="label-container">
                    <div class="label">${name}</div>
                </div>
            </div>
        `;
    });
}

Object.entries(planets).forEach(([name, _]) => {
    // Add a button for each planet
    document.querySelector('.controller').innerHTML += `
        <button id=${name}>${name}</button>
    `;
});

[...document.querySelectorAll('.controller button')].forEach(button => {
    // Add listeners to the planet buttons
    button.addEventListener('click', e => {
        // Get the anchor that we need to navigate to
        const target = document.querySelector(`#${button.id}-anchor`);
        // Get y position of the anchor element
        const scroll = target.getBoundingClientRect().y;
        // Convert the current average scroll speed from km to px
        const pxSpeedMs = kmToPx(state.speed);
        // Set the duration of the scroll: pixels to scroll / scroll speed
        const duration = Math.abs(scroll / pxSpeedMs);
        // Update the duration of the scroller
        scroller.update({ duration });
        // Scroll to the element
        scroller.to(document.documentElement.scrollTop + scroll);
        // Store the start time in state
        state.stats.lastStep = new Date();
    });
});

[...document.querySelectorAll('input[type="range"]')].forEach(range => {
    range.addEventListener('input', e => {
        state[e.target.id] = parseFloat(e.target.value);
        // Scale is how many px = 1,000,000 km
        const pxUnitRatio = state.scale;
        // To find the px to km ratio, divide 1,000,000 km by scale
        const pxKmRatio = 1000000 / pxUnitRatio;
        document.querySelector('#scale-value').innerHTML = pxKmRatio.toLocaleString();
        document.querySelector('#scale-value-200').innerHTML = parseInt(pxKmRatio * 200).toLocaleString();
        // Speed is km/ms
        const kmPerMs = state.speed
        // Convert to km/s by multiplying by 1,000
        const kmPerS = kmPerMs * 1000;
        document.querySelector('#speed-value').innerHTML = kmPerS.toLocaleString();
        // If the scale has changed, rerender the planets
        if (e.target.id === 'scale') renderPlanets();
    });
});

// Scroll back to the top before unload (for page refreshes / navigation)
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// The initial planet render
renderPlanets();