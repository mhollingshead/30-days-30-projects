import gameStart from '../assets/audio/game-start.mp3';
import gameEnd from '../assets/audio/game-end.mp3';
import placePiece from '../assets/audio/place-piece.mp3';

export const playGameStartSFX = () => {
    const audio = new Audio(gameStart);
    audio.play();
}

export const playGameEndSFX = () => {
    const audio = new Audio(gameEnd);
    audio.play();
}

export const playPlacePieceSFX = () => {
    const audio = new Audio(placePiece);
    audio.currentTime = 0.01;
    audio.play();
}