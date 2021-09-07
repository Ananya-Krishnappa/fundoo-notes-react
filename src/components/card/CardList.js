import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./CardList.scss";
import Grid from '@material-ui/core/Grid';
import UpdateNote from "../updateNote/UpdateNote";
import { AuthContext } from "../../context/AuthContext";
import { updateNote, pinNote, trashNote, archiveNote } from "../../services/Api";
import Notification from "../Notification";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        flexGrow: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function CardList(props) {
    const { userId } = useContext(AuthContext);
    const classes = useStyles();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [open, setOpen] = useState(false);
    const [noteToUpdate, setNoteToUpdate] = useState({});
    const handleClickOpen = (event, updateNote) => {
        setOpen(true);
        setNoteToUpdate(updateNote);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickAway = (noteData) => {
        setOpen(false);
        const updateNoteBody = {
            userId, title: noteData.title, description: noteData.description, isPinned: noteData.isPinned
        };
        updateNote(noteData._id, updateNoteBody).then((res) => {
            updateNotesSuccess(res);
        }).catch((error) => {
            updateNotesError(error);
        });;
    };
    const updateNotesSuccess = (res) => {
        setNoteToUpdate(res.data.data);
        props.updateNotesCallback();
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
        document.getElementById(id).classList.remove("display-card-action");
    }
    const hideActionPanel = (id) => {
        document.getElementById(id).classList.add("display-card-action");
    }
    const archiveNoteFunc = (event, note) => {
        event.stopPropagation();
        const reqBody = {
            userId, isArchived: true
        };
        archiveNote(note._id, reqBody).then((res) => {
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
            updateNotesSuccess(res);
        }).catch((error) => {
            updateNotesError(error);
        });
    }
    return (
        <div className="note-list-container">
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" item xs={12} >
                        {
                            props.notes !== undefined && props.notes.map((note, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                        <Card onMouseOut={() => hideActionPanel(note._id)} onMouseOver={() => showActionPanel(note._id)} className={clsx(classes.root, "note-card")}
                                            onClick={(event) => handleClickOpen(event, note)}>
                                            <CardContent>
                                                <Typography onClick={(event) => pinNoteFunc(event, note)} className={note.isPinned ? "pin-note pin" : "pin-note"}></Typography>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    {note.title}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {note.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions id={note._id} className="card-action-panel display-card-action">
                                                <Button size="small" onClick={(event) => archiveNoteFunc(event, note)}><ArchiveOutlinedIcon></ArchiveOutlinedIcon></Button>
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
                handleClickAwayCallback={handleClickAway} note={noteToUpdate}></UpdateNote>
            <Notification notify={notify} setNotify={setNotify} />
        </div >
    );
}
