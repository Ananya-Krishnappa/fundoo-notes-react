import { DataTypes } from "./Types";

const protocol = "http";
const hostname = "localhost";
const port = 3000;

export const RestUrls = {
    [DataTypes.NOTES]: `${protocol}://${hostname}:${port}/findNotes/all`,
    [DataTypes.REGISTER]: `${protocol}://${hostname}:${port}/register`,
}
export const authUrl = `${protocol}://${hostname}:${port}/login`;