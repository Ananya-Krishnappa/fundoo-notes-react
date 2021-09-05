import axios from "axios";
axios.defaults.baseURL = process.env.React_App_BASEURL;

export const register = (userData) => {
    return axios.post("/register", userData);
}
export const resetPassword = (id, token, userData) => {
    return axios.post(`/resetPassword?id=${id}&token=${token}`, userData);
}
export const forgotPassword = (userData) => {
    return axios.post("/forgotPassword", userData);
}
export const findAllNotes = (userId) => {
    return axios.post("/findNotes/all", { userId: userId });
}
export const findTrashedNotes = (userId) => {
    return axios.post("/findNotes/trash", { userId: userId });
}
export const findArchivedNotes = (userId) => {
    return axios.post("/findNotes/archive", { userId: userId });
}
export const createNote = (noteData) => {
    return axios.post("/notes", noteData);
}


