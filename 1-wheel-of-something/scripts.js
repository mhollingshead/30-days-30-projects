// Utility function to get a random integer within a range
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Our wheel segment & confetti colors
const colors = ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00"];

// Constants
const MIN_SPINS = 6;
const SPIN_LENGTH = 10;

// Shoot confetti and play success sound effects
const celebrate = () => {
    // Confetti
    confetti({ colors: colors });
    const confettiSFX = new Audio('assets/sfx/confetti.mp3');
    confettiSFX.play();
    // Success jingle
    const successSFX = new Audio('assets/sfx/success.mp3');
    successSFX.volume = 0.8;
    successSFX.play();
    // Party horn
    const partyHornSFX = new Audio('assets/sfx/party-horn.mp3');
    partyHornSFX.volume = 0.25;
    setTimeout(() => partyHornSFX.play(), 1500);
}

// Draw the wheel using canvas
const drawWheel = options => {
    const ctx = document.querySelector('.wheel').getContext('2d');
    const rad = ctx.canvas.width / 2;
    const arc = (2 * Math.PI) / options.length;
    // Draw each segment
    options.forEach((option, i) => {
        const ang = arc * i;
        ctx.save()
        // Draw the "slice"
        ctx.fillStyle = colors[i % colors.length];
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, ang, ang + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();
        ctx.stroke();
        // Write the option text
        ctx.fillStyle = "#fff";
        ctx.textAlign = "right";
        ctx.font = "bold 16px sans-serif";
        ctx.translate(rad, rad);
        ctx.rotate(ang + arc / 2);
        ctx.fillText(option, rad - 24, 5.3333);
        ctx.restore();
    });
};

// Spin the wheel, landing on a random option
const spinWheel = () => {
    // Spin wheel at least MIN_SPINS complete rotations plus a random amount
    const rotation = 360 * MIN_SPINS + randomInRange(0, 359);
    const wheel = document.querySelector('.wheel');
    // Animate the spin using CSS transition and transform
    wheel.style.transition = `transform ${SPIN_LENGTH}s`;
    wheel.style.transform = `rotate(${rotation}deg)`;
    // When the spin has completed, set the angle of rotation to the equivalent
    // degree < 360 so we can repeat
    setTimeout(() => {
        celebrate();
        wheel.style.transition = 'none';
        wheel.style.transform = `rotate(${rotation % 360}deg)`;
    }, SPIN_LENGTH * 1000);
};

// Check if the wheel can be spun
const canSpin = () => {
    const options = document.querySelector('.options').value.split('\n');
    // We must have at least two options and at most 32 options
    return options.length >= 2 && options.length <= 32;
};

// Update the wheel on each textarea input
document.querySelector('.options').addEventListener('input', e => {
    const optionsArea = document.querySelector('.options-wrapper');
    if (!canSpin()) {
        optionsArea.classList.add('error');
    } else {
        optionsArea.classList.remove('error');
        const options = e.target.value.split('\n');
        drawWheel(options);
    }
});

// Spin the wheel when the "spin" button is clicked
document.querySelector('.spin-button').addEventListener('click', e => {
    if (!canSpin()) return;
    spinWheel();
    // Disable the button while the wheel is spinning
    e.target.disabled = true;
    // Enable once the spinning has completed
    setTimeout(() => e.target.disabled = false, SPIN_LENGTH * 1000);
});

// Populate the wheel / textarea with placeholder options on load
(function() {
    const placeholderOptions = new Array(randomInRange(2, 32)).fill('Option ').map((o, i) => o + (i + 1));
    document.querySelector('.options').value = placeholderOptions.join('\n');
    drawWheel(placeholderOptions);
})();