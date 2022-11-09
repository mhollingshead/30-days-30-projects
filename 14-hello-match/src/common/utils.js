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