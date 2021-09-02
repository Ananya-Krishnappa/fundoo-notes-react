import { ActionTypes } from "./Types";

export const AuthReducer = (storeData, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER:
            return {
                ...storeData,
                [action.payload.dataType]: action.payload,
            };
        default:
            return storeData || {};
    }
}