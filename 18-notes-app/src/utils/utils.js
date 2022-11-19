export const timestamp = () => Number(new Date());

export const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    if (new Date().toLocaleDateString() === date.toLocaleDateString()) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    } else {
        return date.toLocaleDateString();
    }
}

export const getFirstUnusedInt = (notes) => {
    const untitledNotes = notes.filter(note => note.title.includes('Untitled Note '));
    const usedIntArr = untitledNotes.map(note => Number(note.title.replace('Untitled Note ', '')));
    const usedIntSet = new Set(usedIntArr);
    let unusedInt = 1;
    while (usedIntSet.has(unusedInt)) {
        unusedInt++;
    }
    return unusedInt;
}