import { createStore, applyMiddleware } from "redux";
import { NoteReducer } from "./NoteReducer";
import { CommonReducer } from "./CommonReducer";
import { asyncActions } from "./AsyncMiddleware";

export const NotesDataStore
    = createStore(CommonReducer(NoteReducer),
        applyMiddleware(asyncActions));