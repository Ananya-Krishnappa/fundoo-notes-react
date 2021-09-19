import axios from "axios";
axios.defaults.baseURL = process.env.React_App_BASEURL;
const getHeader = () => {
    return {
        headers: {
            Authorization: `Bearer<${localStorage.getItem("webToken")}>`
        }
    }
}
export const login = (userData) => {
    return axios.post("/login", userData);
}
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
    return axios.post("/findNotes/all", { userId: userId }, getHeader());
}
export const findNotesByLabelName = (userId, labelName) => {
    return axios.post(`/findNotesByLabelName/${labelName}`, { userId: userId }, getHeader());
}
export const findTrashedNotes = (userId) => {
    return axios.post("/findNotes/trash", { userId: userId }, getHeader());
}
export const findArchivedNotes = (userId) => {
    return axios.post("/findNotes/archive", { userId: userId }, getHeader());
}
export const createNote = (noteData) => {
    return axios.post("/notes", noteData, getHeader());
}
export const updateNote = (noteId, noteData) => {
    return axios.put(`/notes/${noteId}`, noteData, getHeader());
}
export const pinNote = (noteId, noteData) => {
    return axios.put(`/pinNote/${noteId}`, noteData, getHeader());
}
export const archiveNote = (noteId, noteData) => {
    return axios.put(`/archiveNote/${noteId}`, noteData, getHeader());
}
export const trashNote = (noteId, noteData) => {
    return axios.put(`/trashNote/${noteId}`, noteData, getHeader());
}
export const deleteNoteForever = (noteId, noteData) => {
    return axios.delete(`/notes/${noteId}`, noteData, getHeader());
}
export const createLabel = (labelData) => {
    return axios.post("/label", labelData, getHeader());
}
export const findAllLabel = () => {
    return axios.get("/label", getHeader());
}



