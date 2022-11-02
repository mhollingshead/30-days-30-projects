const state = {
    scale: 2000, // 2000 px = 1 unit = 1,000,000 km
    speed: 30000,
    autoScrolling: false,
    stats: {
        distance: 0,
        lastStep: 0,
        scrollSpeed: 0
    },
    metering: {
        speeds: [],
        tripStart: 0
    }
};

const pxToKm = px => {
    const pxToKmRatio = 1000000 / state.scale;
    return px * pxToKmRatio;
}

const kmToPx = km => {
    const pxToKmRatio = state.scale / 1000000;
    return km * pxToKmRatio;
}

const updateStats = () => {
    const distancePx = state.stats.distance;
    const distanceKm = pxToKm(distancePx);
    const scrollSpeedKmMs = state.stats.scrollSpeed;
    const scrollSpeedKmS = scrollSpeedKmMs * 1000;
    document.querySelector('#scroll-speed').innerHTML = parseInt(scrollSpeedKmS).toLocaleString();
    document.querySelector('#distance').innerHTML = parseInt(distanceKm).toLocaleString();
}

const handleScrollEnd = () => {
    console.log('Scroll End');
    state.stats.scrollSpeed = 0;
    state.stats.distance = document.documentElement.scrollTop;
    state.autoScrolling = false;
    const averageSpeed = state.metering.speeds.reduce((acc, speed) => acc + (speed || 0), 0) / state.metering.speeds.length - 1;
    const tripDuration = (new Date() - state.metering.tripStart) / 1000;
    state.metering.speeds = [];
    state.metering.tripStart = 0;

    console.log(averageSpeed.toLocaleString() + ' km/s on average');
    console.log(tripDuration + 's total');
    console.log(document.documentElement.scrollTop);

    updateStats();
}

const handleScrollStep = time => {
    const distancePx = document.documentElement.scrollTop;
    const distanceTraveledPx = Math.abs(distancePx - state.stats.distance);
    const timeSinceLastStepMs = (time - state.stats.lastStep);
    const scrollSpeedKmMs = pxToKm(distanceTraveledPx) / timeSinceLastStepMs;
    state.stats.scrollSpeed = scrollSpeedKmMs;
    state.stats.distance = distancePx;
    state.stats.lastStep = time;
    updateStats();

    state.metering.speeds.push(scrollSpeedKmMs * 1000);
}

const scroller = new SweetScroll({ 
    easing: 'easeInOutSine',
}, document.documentElement);

let scrollStopTimeout;
window.addEventListener('scroll', () => {
    handleScrollStep(new Date());
    clearTimeout(scrollStopTimeout);
    scrollStopTimeout = setTimeout(handleScrollEnd, 50);
});

const renderPlanets = () => {
    const universe = document.querySelector('.universe');
    universe.innerHTML = '';

    Object.entries(planets).forEach(([name, data]) => {
        const diameter = state.scale * data.diameter;
        const distance = state.scale * data.distance;
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
    document.querySelector('.controller').innerHTML += `
        <button id=${name}>${name}</button>
    `;
});

[...document.querySelectorAll('.controller button')].forEach(button => {
    button.addEventListener('click', e => {
        const target = document.querySelector(`#${button.id}-anchor`);
        const scroll = target.getBoundingClientRect().y;
        const pxSpeedMs = kmToPx(state.speed);
        const duration = Math.abs(scroll / pxSpeedMs);

        scroller.update({ duration });
        scroller.to(document.documentElement.scrollTop + scroll);
        state.stats.lastStep = new Date();
    });
});

[...document.querySelectorAll('input[type="range"]')].forEach(range => {
    range.addEventListener('input', e => {
        state[e.target.id] = parseFloat(e.target.value);
        // Scale is how many px = 1 unit = 1,000,000 km
        const pxUnitRatio = state.scale;
        // To find the px to km ratio, divide 1,000,000 km by scale
        const pxKmRatio = 1000000 / pxUnitRatio;
        document.querySelector('#scale-value').innerHTML = pxKmRatio.toLocaleString();
        // Speed is km/ms
        const kmPerMs = state.speed
        // Convert to km/s by multiplying by 1,000
        const kmPerS = kmPerMs * 1000;
        document.querySelector('#speed-value').innerHTML = kmPerS.toLocaleString();

        if (e.target.id === 'scale') renderPlanets();
    });
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

renderPlanets();