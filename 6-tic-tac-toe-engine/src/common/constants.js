export const computerNames = {
    0: 'Beginner',
    1: 'Intermediate',
    2: 'Advanced',
    3: 'Expert'
}

export const squareMap = {
    0: 'a1',
    1: 'b1',
    2: 'c1',
    3: 'a2',
    4: 'b2',
    5: 'c2',
    6: 'a3',
    7: 'b3',
    8: 'c3'
}

const getGradient = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 48, 0, 0);
    gradient.addColorStop(0, '#00000065');
    gradient.addColorStop(0.5, '#00000065');
    gradient.addColorStop(0.5, '#ffffff65');
    gradient.addColorStop(1, '#ffffff65');

    return gradient;
}

export const canvasGradient = getGradient();