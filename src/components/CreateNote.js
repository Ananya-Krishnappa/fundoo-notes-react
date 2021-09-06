import React, { useContext, useEffect, useState } from "react";
import "./CreateNote.scss";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ClickAwayListener } from '@material-ui/core';
import { createNote } from "../services/Api";
import { AuthContext } from "../context/AuthContext";
import Notification from "../components/Notification";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));
export default function CreateNote(props) {
    const history = useHistory();
    const { userId } = useContext(AuthContext);
    const classes = useStyles();
    const [toggleCreateNote, setToggleCreateNote] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPinned, toggleIsPinned] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const toggleAccordian = () => {
        setToggleCreateNote(!toggleCreateNote ? true : true);
    }
    const closeAccordian = () => {
        setToggleCreateNote(!toggleCreateNote);
    }
    const handleClickAway = () => {
        if (title !== '' && description !== '') {
            setToggleCreateNote(toggleCreateNote ? false : false);
            const noteData = {
                title,
                description,
                isPinned,
                userId,
            };
            createNote(noteData).then((res) => {
                if (res.data.success === true) {
                    setNotify({
                        isOpen: true,
                        message: "Note created Successfully",
                        type: "success",
                    });
                    props.updateNoteCallback();
                } else {
                    setNotify({
                        isOpen: true,
                        message: "Something went wrong",
                        type: "error",
                    });
                }
            })
                .catch((error) => {
                    let message;
                    if (error.message.includes("500")) {
                        message = "Error occured while creating note";
                    }
                    else if ((error.message.includes("400"))) {
                        message = "Invalid input";
                    }
                    else {
                        message = "Something went wrong";
                    }
                    setNotify({
                        isOpen: true,
                        message: message,
                        type: "error",
                    });
                });
            setTitle("");
            setDescription("");
            toggleIsPinned(false);
        }
    }
    const syncTitle = (title) => {
        setTitle(title);
    }
    const syncDescription = (description) => {
        setDescription(description);
    }
    const syncIsPinned = () => {
        toggleIsPinned(!isPinned)
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="create-note-container">
                {toggleCreateNote && <React.Fragment><div className={isPinned ? "pin-note pin" : "pin-note"} onClick={syncIsPinned}></div>
                    <TextField autoComplete="off" id="title-input" placeholder="Title" fullWidth
                        onChange={(event) => syncTitle(event.target.value)} name="title" value={title}
                        InputProps={{ classes, disableUnderline: true }} /></React.Fragment>}
                <TextField autoComplete="off" id="desc-input" placeholder="Take a note..." fullWidth onChange={(event) => syncDescription(event.target.value)}
                    name="description" value={description}
                    InputProps={{ classes, disableUnderline: true }} onClick={toggleAccordian} />
                {toggleCreateNote && <div className="create-note-bottom-panel">
                    <button className="close-create-note" onClick={closeAccordian}>Close</button>
                </div>}
                <Notification notify={notify} setNotify={setNotify} />
            </div>
        </ClickAwayListener>
    );
}