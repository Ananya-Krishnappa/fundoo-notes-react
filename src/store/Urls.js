import { DataTypes } from "./Types";

const protocol = "http";
const hostname = "localhost";
const port = 3000;

export const RestUrls = {
    [DataTypes.NOTES]: `${protocol}://${hostname}:${port}/findNotes/all`,
}
export const authUrl = `${protocol}://${hostname}:${port}/login`;