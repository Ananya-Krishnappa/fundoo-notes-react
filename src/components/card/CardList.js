import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./CardList.scss";
import Grid from '@material-ui/core/Grid';
import UpdateNote from "../updateNote/UpdateNote";
import { AuthContext } from "../../context/AuthContext";
import { updateNote } from "../../services/Api";
import Notification from "../Notification";
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
    const [note, setNote] = useState({});
    const handleClickOpen = (event, updateNote) => {
        setOpen(true);
        setNote(updateNote);
    };
    const handleClose = (noteData) => {
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
        setNote(res.data.data);
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
    return (
        <div className="note-list-container">
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" item xs={12} >
                        {
                            props.notes !== undefined && props.notes.map((note, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                        <Card className={clsx(classes.root, "note-card")} onClick={(event) => handleClickOpen(event, note)}>
                                            <CardContent>
                                                <div className={note.isPinned ? "pin-note pin" : "pin-note"}></div>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    {note.title}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {note.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
            <UpdateNote isModalOpen={open} handleCloseCallback={handleClose}
                handleClickAwayCallback={handleClickAway} note={note}></UpdateNote>
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}
