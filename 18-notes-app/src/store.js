import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './features/notes/notesSlice';

export default configureStore({
    reducer: {
        notes: notesReducer
    },
});