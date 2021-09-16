import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./TrashNote.scss";
import Grid from '@material-ui/core/Grid';
import UpdateNote from "../updateNote/UpdateNote";
import { AuthContext } from "../../context/AuthContext";
import { updateNote, trashNote, deleteNoteForever } from "../../services/Api";
import Notification from "../Notification";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { findTrashedNotes } from "../../services/Api";
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));
/**
 * @description SimpleCard functional component to return Note Card
 * @param props values containing note data
 * @return Note card component
 */
export default function TrashNote(props) {
  const { userId } = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState({});
  const [notes, setNotes] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    findNotes();
  }, []);
  /**
     * @description handleMenuClose function used to handle on click of open
     */
  const handleClickOpen = (event, updateNote) => {
    setOpen(true);
    setNoteToUpdate(updateNote);
  };
  /**
     * @description handleMenuClose function used to handle on click of close
     */
  const handleClose = () => {
    setOpen(false);
    setNoteToUpdate({});
  };
  /**
     * @description handleClickAway function used to handle click away
     */
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
    document.getElementById(id).classList.remove("display-card-action");
  }
  const hideActionPanel = (id) => {
    document.getElementById(id).classList.add("display-card-action");
  }
  const restoreNoteFunc = (event, note) => {
    event.stopPropagation();
    const reqBody = {
      userId, isTrashed: false
    };
    trashNote(note._id, reqBody).then((res) => {
      updateNotesSuccess(res);
    }).catch((error) => {
      updateNotesError(error);
    });
  }
  const deleteNoteForeverFunc = (event, note) => {
    event.stopPropagation();
    const reqBody = {
      userId
    };
    deleteNoteForever(note._id, reqBody).then((res) => {
      updateNotesSuccess(res);
    }).catch((error) => {
      updateNotesError(error);
    });
  }
  const findNotes = () => {
    findTrashedNotes(userId).then((res) => {
      setNotes(res.data.data);
    }).catch((error) => {
      updateNotesError(error);
    });
  }
  return (
    <React.Fragment>
      <div className="note-list-container">
        <Grid container className="root">
          <Grid item xs={12}>
            <Grid container justifyContent="center" item xs={12} >
              {
                notes !== undefined && notes.map((note, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                      <Card onMouseOut={() => hideActionPanel(note._id)} onMouseOver={() => showActionPanel(note._id)} className={clsx(classes.root, "note-card")}
                        onClick={(event) => handleClickOpen(event, note)}>
                        <CardContent>
                          <Typography className="title" color="textSecondary" gutterBottom>
                            {note.title}
                          </Typography>
                          <Typography variant="body2" component="p">
                            {note.description}
                          </Typography>
                        </CardContent>
                        <CardActions id={note._id} className="card-action-panel display-card-action">
                          <Button size="small" onClick={(event) => restoreNoteFunc(event, note)}>
                            <Tooltip title="Restore"><RestoreFromTrashOutlinedIcon></RestoreFromTrashOutlinedIcon></Tooltip>
                          </Button>
                          <Button size="small" onClick={(event) => deleteNoteForeverFunc(event, note)}>
                            <Tooltip title="Delete forever"><DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon></Tooltip>
                          </Button>
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
    </React.Fragment>
  );
}
