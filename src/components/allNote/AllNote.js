import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./AllNote.scss";
import Grid from '@material-ui/core/Grid';
import UpdateNote from "../updateNote/UpdateNote";
import { AuthContext } from "../../context/AuthContext";
import { updateNote, pinNote, trashNote, archiveNote, findAllLabel, createLabel } from "../../services/Api";
import Notification from "../Notification";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CreateNote from "../createNote/CreateNote";
import { findAllNotes } from "../../services/Api";
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
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
        findNotes();
    }, []);
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
    const updateNotesSuccess = (res) => {
        findNotes();
    }
    const updateNotesError = (error) => {
        let message;
        message = error.response && error.response.data.message;
        setNotify({
            isOpen: true,
            message: message,
            type: "error",
        });
    }
    const showActionPanel = (id) => {
        document.getElementById("pin" + id).classList.remove("display-card-action");
        document.getElementById(id).classList.remove("display-card-action");
    }
    const hideActionPanel = (id) => {
        document.getElementById("pin" + id).classList.add("display-card-action");
        document.getElementById(id).classList.add("display-card-action");
    }
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
    const findNotes = () => {
        findAllNotes(userId).then((res) => {
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
        }).catch((error) => {
            updateNotesError(error);
        });
    }
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
    const handleAddLabel = (event) => {
        setAnchorEl(null);
        event.stopPropagation();
        setAnchorElAddLabel(event.currentTarget);
        findAllLabelFunc();
    }
    const handleAddLabelMenuClose = (event) => {
        setAnchorElAddLabel(null);
        setLabelName("");
        setShowCreateLabel(false);
        event.stopPropagation();
    }
    const syncLabelName = (event) => {
        if (event.target.value.trim() !== "") {
            setShowCreateLabel(true);
        }
        setLabelName(event.target.value);
    }
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
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" item xs={12} >
                            {
                                notes !== undefined && notes.map((note, index) => {
                                    return (
                                        <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                            <Card onMouseOut={() => hideActionPanel(note._id)} onMouseOver={() => showActionPanel(note._id)} className={clsx(classes.root, "note-card")}
                                                onClick={(event) => handleClickOpen(event, note)}>
                                                <CardContent>
                                                    <Typography onClick={(event) => pinNoteFunc(event, note)} id={"pin" + note._id} className="display-card-action">
                                                        <div className={note.isPinned ? "pin-note pin" : "pin-note"}></div>
                                                    </Typography>
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        {note.title}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        {note.description}
                                                    </Typography>
                                                    <Typography className="chip-section">
                                                        {note.labels && note.labels.length > 0 && note.labels.filter(lbl => lbl.checked === true).map(label => {
                                                            return <Chip className="label-chip" key={label._id} label={label.labelName} onDelete={event => handleLabelDelete(event, note, label)} color="primary" />
                                                        })}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions id={note._id} className="card-action-panel display-card-action">
                                                    <Tooltip title="Archive">
                                                        <Button size="small" onClick={(event) => archiveNoteFunc(event, note)}>
                                                            <ArchiveOutlinedIcon></ArchiveOutlinedIcon>
                                                        </Button>
                                                    </Tooltip>
                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true" onClick={(event) => handleMenuClick(event, note)}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose} className="menu-list"
                                                    >
                                                        <MenuItem onClick={(event) => handleDeleteNote(event, true)}>Delete note</MenuItem>
                                                        <MenuItem onClick={(event) => handleAddLabel(event, true)}>Add label</MenuItem>
                                                    </Menu>
                                                    <Menu
                                                        id="add-label-menu"
                                                        anchorEl={anchorElAddLabel}
                                                        keepMounted
                                                        open={Boolean(anchorElAddLabel)}
                                                        onClose={handleAddLabelMenuClose} className="add-label-menu"
                                                    >
                                                        <MenuItem>Label note</MenuItem>
                                                        <MenuItem onKeyDown={(e) => e.stopPropagation()}><TextField autoComplete="off" id="labelName-input" placeholder="Enter label name" fullWidth
                                                            onChange={(event) => syncLabelName(event)} name="labelName" value={labelName}
                                                            InputProps={{ classes, disableUnderline: true }} /></MenuItem>
                                                        {labelList.map(lbl => {
                                                            return <MenuItem key={lbl._id}><Checkbox checked={lbl.checked}
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'secondary checkbox' }} onChange={event => handleLabelCheckboxChange(event, lbl)}
                                                            /> {lbl.labelName}</MenuItem>
                                                        })}
                                                        {showCreateLabel && <MenuItem onClick={createLabelFunc}>{`+ Create "${labelName}"`}</MenuItem>}
                                                    </Menu>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Grid>
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
