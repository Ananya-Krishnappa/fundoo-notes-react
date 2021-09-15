import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./AllNote.scss";
import Grid from '@material-ui/core/Grid';
import UpdateNote from "../updateNote/UpdateNote";
import { AuthContext } from "../../context/AuthContext";
import { updateNote, pinNote, trashNote, archiveNote, findAllLabel, createLabel, findNotesByLabelName } from "../../services/Api";
import Notification from "../Notification";
import CreateNote from "../createNote/CreateNote";
import Note from "../notes/Notes";
import { findAllNotes } from "../../services/Api";
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        flexGrow: 1,
    },
}));
/**
 * @description SimpleCard functional component to return Note Card
 * @param props values containing note data
 * @return Note card component
 */
export default function AllNote(props) {
    const { userId } = useContext(AuthContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAddLabel, setAnchorElAddLabel] = useState(null);
    const [noteSelected, setNoteSelected] = useState({});
    const [open, setOpen] = useState(false);
    const [noteToUpdate, setNoteToUpdate] = useState({});
    const [notes, setNotes] = useState([]);
    const [labelList, setLabelList] = useState([]);
    const [showCreateLabel, setShowCreateLabel] = useState(false);
    const [labelName, setLabelName] = useState("");
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    useEffect(() => {
        findNotes(props.routeLabel);
    }, [props.routeLabel]);
    /**
     * @description handleMenuClick function used to handle on click of card
     * @return props containing note details
     */
    const handleMenuClick = (event, note) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
        setNoteSelected(note);
        setLabelList([]);
    };
    /**
       * @description handleMenuClose function used to handle on click of close
       */
    const handleMenuClose = (event) => {
        setAnchorEl(null);
        event.stopPropagation();
        setNoteSelected({});
    };
    /**
       * @description handleMenuClose function used to handle on click of open
       */
    const handleClickOpen = (event, updateNote) => {
        if (anchorElAddLabel === null) {
            setOpen(true);
            setNoteToUpdate(updateNote);
        }
    };
    /**
       * @description handleMenuClose function used to handle on click of close
       */
    const handleClose = () => {
        setOpen(false);
    };
    /**
       * @description handleClickAway function used to handle click away
       */
    const handleClickAway = (noteData) => {
        setOpen(false);
        const updateNoteBody = {
            userId, title: noteData.title, description: noteData.description, isPinned: noteData.isPinned, labels: noteData.labels
        };
        updateNote(noteData._id, updateNoteBody).then((res) => {
            setNoteToUpdate(res.data.data);
            updateNotesSuccess(res);
        }).catch((error) => {
            updateNotesError(error);
        });
    };
    /**
     * @description function to find all note on success
     */
    const updateNotesSuccess = (res) => {
        findNotes(props.match.params.labelName);
    }
    /**
     * @description function to display message on error
     */
    const updateNotesError = (error) => {
        let message;
        message = error.response && error.response.data.message;
        setNotify({
            isOpen: true,
            message: message,
            type: "error",
        });
    }
    /**
     * @description function to achive note functionality
     */
    const archiveNoteFunc = (event, note) => {
        event.stopPropagation();
        const reqBody = {
            userId, isArchived: true
        };
        archiveNote(note._id, reqBody).then((res) => {
            setNoteToUpdate(res.data.data);
            updateNotesSuccess(res);
        }).catch((error) => {
            updateNotesError(error);
        });
    }
    /**
     * @description function to handle delete note functionality
     */
    const handleDeleteNote = (event, isParent, note) => {
        let noteId = '';
        if (isParent) {
            noteId = noteSelected._id;
        } else {
            noteId = note._id;
        }
        setAnchorEl(null);
        event.stopPropagation();
        const reqBody = {
            userId, isTrashed: true
        };
        trashNote(noteId, reqBody).then((res) => {
            setNoteToUpdate(res.data.data);
            updateNotesSuccess(res);
        }).catch((error) => {
            updateNotesError(error);
        });
    }
    /**
     * @description functionality to handle pin notes functionality
     */
    const pinNoteFunc = (event, note) => {
        event.stopPropagation();
        const reqBody = {
            userId, isPinned: !note.isPinned
        };
        pinNote(note._id, reqBody).then((res) => {
            setNoteToUpdate(res.data.data);
            updateNotesSuccess(res);
        }).catch((error) => {
            updateNotesError(error);
        });
    }
    const findAllNotesSuccess = (res) => {
        const notes = res.data.data;
        if (notes) {
            notes.map(note => {
                if (note.labels) {
                    note.labels = note.labels.map(label => {
                        label.checked = true;
                        return label;
                    })
                }
            });
        }
        setNotes(notes);
    }
    /**
     * @description functionality to find all notes
     */
    const findNotes = (labelName) => {
        //throw new Error('I crashed!');
        if (labelName === "all") {
            findAllNotes(userId).then((res) => {
                findAllNotesSuccess(res);
            }).catch((error) => {
                updateNotesError(error);
            });
        } else {
            findNotesByLabelName(userId, labelName).then((res) => {
                findAllNotesSuccess(res);
            }).catch((error) => {
                updateNotesError(error);
            });
        }

    }
    /**
     * @description function to handle label delete operation
     */
    const handleLabelDelete = (event, note, label) => {
        event.stopPropagation();
        const labels = note.labels.filter(lbl => lbl._id !== label._id);
        const reqBody = {
            userId, title: note.title, description: note.description, isPinned: note.isPinned, labels
        };
        updateNote(note._id, reqBody).then((res) => {
            setNoteToUpdate(res.data.data);
            updateNotesSuccess(res);
        }).catch((error) => {
            updateNotesError(error);
        });
    }
    /**
     * @description function to handle find all label function
     */
    const findAllLabelFunc = (defaultChecked, id) => {
        findAllLabel().then((res) => {
            if (defaultChecked) {
                let newLabel = res.data.data.filter(ele => {
                    if (ele._id === id) {
                        ele.checked = true;
                        return ele;
                    }
                });
                setLabelList([...labelList, newLabel[0]]);
                const updatedNote = noteSelected;
                updatedNote.labels.push(newLabel[0]);
                const updateNoteBody = {
                    userId, title: updatedNote.title, description: updatedNote.description, isPinned: updatedNote.isPinned, labels: updatedNote.labels
                };
                updateNote(updatedNote._id, updateNoteBody).then((res) => {
                    setNoteToUpdate(res.data.data);
                    updateNotesSuccess(res);
                }).catch((error) => {
                    updateNotesError(error);
                });
            } else {
                let allLabels = res.data.data.map(ele => {
                    if (noteSelected.labels.find(lbl => lbl._id === ele._id)) {
                        ele.checked = true;
                    }
                    return ele;
                });
                setLabelList(allLabels);
            }
        })
            .catch((error) => {
                let message;
                message = error.response && error.response.data.message;
                setNotify({
                    isOpen: true,
                    message: message,
                    type: "error",
                });
            });
    }
    /**
     * @description function to handle add label operation
     */
    const handleAddLabel = (event) => {
        setAnchorEl(null);
        event.stopPropagation();
        setAnchorElAddLabel(event.currentTarget);
        findAllLabelFunc();
    }
    /**
     * @description function to handle add label on close
     */
    const handleAddLabelMenuClose = (event) => {
        setAnchorElAddLabel(null);
        setLabelName("");
        setShowCreateLabel(false);
        event.stopPropagation();
    }
    /**
     * @description function to sync label name
     */
    const syncLabelName = (event) => {
        if (event.target.value.trim() !== "") {
            setShowCreateLabel(true);
        }
        setLabelName(event.target.value);
    }
    /**
     * @description function to handle label checkout on selection
     */
    const handleLabelCheckboxChange = (event, label) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.checked) {
            let allLabels = labelList.map(ele => {
                if (ele._id === label._id) {
                    ele.checked = true;
                    return ele;
                }
                return ele;
            });
            setLabelList(allLabels);
            const updatedNote = noteSelected;
            updatedNote.labels.push(label);
            const updateNoteBody = {
                userId, title: updatedNote.title, description: updatedNote.description, isPinned: updatedNote.isPinned, labels: updatedNote.labels
            };
            updateNote(updatedNote._id, updateNoteBody).then((res) => {
                setNoteToUpdate(res.data.data);
                updateNotesSuccess(res);
            }).catch((error) => {
                updateNotesError(error);
            });
        } else {
            let allLabels = labelList.map(ele => {
                if (ele._id === label._id) {
                    ele.checked = false;
                    return ele;
                }
                return ele;
            });
            setLabelList(allLabels);
            const updatedNote = noteSelected;
            updatedNote.labels = allLabels.filter(label => label.checked);
            const updateNoteBody = {
                userId, title: updatedNote.title, description: updatedNote.description, isPinned: updatedNote.isPinned, labels: updatedNote.labels
            };
            updateNote(updatedNote._id, updateNoteBody).then((res) => {
                setNoteToUpdate(res.data.data);
                updateNotesSuccess(res);
            }).catch((error) => {
                updateNotesError(error);
            });
        }
    }
    /**
     * @description function to create label
     */
    const createLabelFunc = () => {
        const labelData = {
            "labelName": labelName
        }
        createLabel(labelData).then((res) => {
            setNotify({
                isOpen: true,
                message: "Label created Successfully",
                type: "success",
            });
            setLabelName("");
            setShowCreateLabel(false);
            findAllLabelFunc(true, res.data.data._id);
        })
            .catch((error) => {
                let message;
                message = error.response && error.response.data.message;
                setNotify({
                    isOpen: true,
                    message: message,
                    type: "error",
                });
            });
    }
    return (
        <React.Fragment>
            <CreateNote createNoteCallback={findNotes}></CreateNote>
            <div className="note-list-container">
                {notes !== undefined && (notes.filter(note => note.isPinned).length > 0) && <div className="pinned-section">Pinned</div>}
                <Grid container justifyContent="center" item xs={12} className="pin-grid-container">
                    {
                        notes !== undefined && notes.filter(note => note.isPinned).map((note, index) => {
                            return (
                                <Note note={note} index={index} handleClickOpenCallback={handleClickOpen}
                                    pinNoteFuncCallback={pinNoteFunc} handleLabelDeleteCallback={handleLabelDelete}
                                    archiveNoteFuncCallback={archiveNoteFunc} handleMenuClickCallback={handleMenuClick}
                                    anchorEl={anchorEl} handleMenuCloseCallback={handleMenuClose}
                                    handleDeleteNoteCallback={handleDeleteNote} handleAddLabelCallback={handleAddLabel}
                                    anchorElAddLabel={anchorElAddLabel} handleAddLabelMenuCloseCallback={handleAddLabelMenuClose}
                                    syncLabelNameCallback={syncLabelName} labelName={labelName}
                                    labelList={labelList} handleLabelCheckboxChangeCallback={handleLabelCheckboxChange}
                                    showCreateLabel={showCreateLabel} createLabelFuncCallback={createLabelFunc}></Note>
                            )
                        })}
                </Grid>
                {notes !== undefined && (notes.filter(note => !note.isPinned).length > 0) && <div className="others-section">Others</div>}
                <Grid container justifyContent="center" item xs={12} className="pin-grid-container">
                    {
                        notes !== undefined && notes.filter(note => !note.isPinned).map((note, index) => {
                            return (
                                <React.Fragment>
                                    <Note note={note} index={index} handleClickOpenCallback={handleClickOpen}
                                        pinNoteFuncCallback={pinNoteFunc} handleLabelDeleteCallback={handleLabelDelete}
                                        archiveNoteFuncCallback={archiveNoteFunc} handleMenuClickCallback={handleMenuClick}
                                        anchorEl={anchorEl} handleMenuCloseCallback={handleMenuClose}
                                        handleDeleteNoteCallback={handleDeleteNote} handleAddLabelCallback={handleAddLabel}
                                        anchorElAddLabel={anchorElAddLabel} handleAddLabelMenuCloseCallback={handleAddLabelMenuClose}
                                        syncLabelNameCallback={syncLabelName} labelName={labelName}
                                        labelList={labelList} handleLabelCheckboxChangeCallback={handleLabelCheckboxChange}
                                        showCreateLabel={showCreateLabel} createLabelFuncCallback={createLabelFunc}></Note>
                                </React.Fragment>
                            );
                        })
                    }
                </Grid>
                <UpdateNote isModalOpen={open} handleCloseCallback={handleClose}
                    handleClickAwayCallback={handleClickAway} note={noteToUpdate} handleLabelDeleteCallback={handleLabelDelete}
                    handleDeleteNoteCallback={handleDeleteNote} handleAddLabelCallback={handleAddLabel}
                    handleAddLabelMenuCloseCallback={handleAddLabelMenuClose}
                    labelList={labelList} handleLabelCheckboxChangeCallback={handleLabelCheckboxChange}
                    createLabelFuncCallback={createLabelFunc} syncLabelNameCallback={syncLabelName}
                    handleMenuClickCallback={handleMenuClick} handleMenuCloseCallback={handleMenuClose}
                    archiveNoteFuncCallback={archiveNoteFunc}></UpdateNote>
                <Notification notify={notify} setNotify={setNotify} />
            </div >
        </React.Fragment >
    );
}
