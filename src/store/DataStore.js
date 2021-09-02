import { createStore, applyMiddleware } from "redux";
import { NoteReducer } from "./NoteReducer";
import { AuthReducer } from "./AuthReducer";
import { CommonReducer } from "./CommonReducer";
import { asyncActions } from "./AsyncMiddleware";

export const NotesDataStore
    = createStore(CommonReducer(NoteReducer, AuthReducer),
        applyMiddleware(asyncActions));