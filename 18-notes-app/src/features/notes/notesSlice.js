import { createSlice } from '@reduxjs/toolkit';
import { getFirstUnusedInt, timestamp } from '../../utils/utils';

const notes = JSON.parse(localStorage.getItem('notes')) || [{
    id: timestamp(),
    title: 'Untitled Note 1',
    contents: {},
    text: '',
    html: '',
    lastEdit: timestamp()
}];

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        all: notes,
        active: null
    },
    reducers: {
        addNote: (state) => {
            state.all = [
                {
                    id: timestamp(),
                    title: `Untitled Note ${getFirstUnusedInt(state.all)}`,
                    contents: {},
                    text: '',
                    html: '',
                    lastEdit: timestamp()
                },
                ...state.all
            ];
            state.active = state.all[0];
        },
        removeNote: (state) => {
            const id = state.active.id;
            if (id) {
                state.all = state.all.filter(note => note.id !== id);
                state.active = state.all[0] || null;
            }
        },
        updateNote: (state, action) => {
            const updatedNotes = state.all.filter(note => note.id !== action.payload.id);
            state.all = [ action.payload, ...updatedNotes];
            state.active = state.all[0];
        },
        setActiveNote: (state, action) => {
            state.active = state.all.find(note => note.id === action.payload);
        }
    },
})

export const { addNote, removeNote, updateNote, setActiveNote } = notesSlice.actions;

export default notesSlice.reducer;