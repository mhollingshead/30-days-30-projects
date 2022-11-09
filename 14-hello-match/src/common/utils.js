import confetti from 'canvas-confetti';

export const shuffle = original => {
    const array = [].concat(original);
    let currentIndex = array.length, randomIndex, tmp;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tmp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tmp;
    }
  
    return array;
}

export const launchConfetti = () => {
    var end = Date.now() + 4000;
    var colors = ['#00cdae', '#00a58c', '#3fffe2', '#333333'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.5 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.5 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}