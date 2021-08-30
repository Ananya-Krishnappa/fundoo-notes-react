import { ActionTypes } from "./Types";

export const NoteReducer = (storeData, action) => {
    switch (action.type) {
        case ActionTypes.DATA_LOAD:
            return {
                ...storeData,
                [action.payload.dataType]: action.payload.data.data,
            };
        default:
            return storeData || {};
    }
}