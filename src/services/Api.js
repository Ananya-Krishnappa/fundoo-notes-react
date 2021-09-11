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
export const findNotesByLabelName = (userId, labelName) => {
    return axios.post(`/findNotesByLabelName/${labelName}`, { userId: userId });
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
export const updateNote = (noteId, noteData) => {
    return axios.put(`/notes/${noteId}`, noteData);
}
export const pinNote = (noteId, noteData) => {
    return axios.put(`/pinNote/${noteId}`, noteData);
}
export const archiveNote = (noteId, noteData) => {
    return axios.put(`/archiveNote/${noteId}`, noteData);
}
export const trashNote = (noteId, noteData) => {
    return axios.put(`/trashNote/${noteId}`, noteData);
}
export const deleteNoteForever = (noteId, noteData) => {
    return axios.delete(`/notes/${noteId}`, noteData);
}
export const createLabel = (labelData) => {
    return axios.post("/label", labelData);
}
export const findAllLabel = () => {
    return axios.get("/label");
}



