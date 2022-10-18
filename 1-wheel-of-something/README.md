<h1 align="center">Wheel. Of. Something.</h1>

*A simple webapp that takes a list of possible outcomes, puts them on a wheel, and can be spun to randomly select one outcome.*

### [Try it out here!](https://mhollingshead.github.io/30-days-30-projects/1-wheel-of-something/)

### Tech Stack

* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="16" height="16" /> JavaScript
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="16" height="16" /> HTML
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="16" height="16" /> CSS
* [canvas-confetti](https://github.com/catdad/canvas-confetti)

Because the functionality that we need to implement is fairly simple, I decided to go with the vanilla HTML/CSS/JS stack. We don't need complex state, so state-based rendering frameworks like React would be overkill.

### Implementation

I wanted to keep it fairly simple: no complicated form submissions or modals. The app is composed of 3 main sections:

* the header / logo,
* the wheel itself, and
* the option input form

<img src="assets/img/sample.png" style="width: 100%; border-radius: 4px;" />

The option input form is a simple `textarea` element where the user inputs one option per line. We listen for changes to the options using an `onInput` listener, which regenerates the wheel each time the input has changed (provided the input is valid). Based on how the wheel is generated, I've opted for a minimum of 2 inputs and a maximum of 32 inputs, otherwise the wheel gets overcrowded.

The dynamic wheel generation was definitely the most "complicated" part of the implementation. After attempting to use styled `div`s for each section, I realized that I would be much better off going with a `canvas` element.

After retrieving the `options` by reading the input value and splitting by newlines, we send the options to the `drawWheel` function:

```javascript
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
```

Much simpler than dynamically placing, offsetting, and rotating divs. The segment drawing was based mostly on [this implementation](https://stackoverflow.com/a/33850748/12264298) on stack overflow, and the wheel styling was inspired by the [Trivia Crack spinner](https://triviabliss.com/wp-content/uploads/2021/02/BN-HB013_0220tr_J_20150220133629.jpg).

For simplicity, I opted to choose the result in a way that doesn't require us obtaining it programmatically. The winning option is purely visual––whichever option the arrow is pointing to when the wheel stops spinning. Going forward, I would probably determine the winning result programmatically as well for accessability purposes, but this works for now.

We simply `transform: rotate` the wheel element by some random amount and apply a `transition` to the `transform` property to get the spinning effect:

```javascript
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
```

After the spin has completed, we remove the `transition` property and switch the rotation to its < 360˚ counterpart. That way, if the wheel is respun it will still spin `MIN_SPINS` complete rotations plus a random amount. For example, if the wheel rotates 740˚, we set the rotation to 20˚ so that future spins will behave as we expect them to.

The result of the spin was somewhat underwhelming, so I decided to make it a bit more extravagant using catdad's [canvas-confetti](https://github.com/catdad/canvas-confetti) library, plus a few celebratory sound effects.