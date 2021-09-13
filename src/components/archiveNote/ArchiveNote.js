import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./ArchiveNote.scss";
import Grid from '@material-ui/core/Grid';
import UpdateNote from "../updateNote/UpdateNote";
import { AuthContext } from "../../context/AuthContext";
import { updateNote, pinNote, trashNote, archiveNote } from "../../services/Api";
import Notification from "../Notification";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { findArchivedNotes } from "../../services/Api";
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
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
export default function ArchiveNote(props) {
  const { userId } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState({});
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
   * @description handleMenuClick function used to handle on click of card
   * @return props containing note details
   */
  const handleMenuClick = (event, note) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
    setNoteToDelete(note);
  };
  /**
     * @description handleMenuClose function used to handle on click of close
     */
  const handleMenuClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };
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
      setNoteToUpdate(res.data.data);
      updateNotesSuccess(res);
    }).catch((error) => {
      updateNotesError(error);
    });;
  };
  /**
     * @description function to find all notes on success
     */
  const updateNotesSuccess = (res) => {
    findNotes();
  }
  /**
     * @description function to display error message 
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
     * @description function to handle show action panel
     */
  const showActionPanel = (id) => {
    document.getElementById("pin" + id).classList.remove("display-card-action");
    document.getElementById(id).classList.remove("display-card-action");
  }
  /**
     * @description function to handle action panel
     */
  const hideActionPanel = (id) => {
    document.getElementById("pin" + id).classList.add("display-card-action");
    document.getElementById(id).classList.add("display-card-action");
  }
  /**
     * @description function to handle unarchive notes
     */
  const unArchiveNoteFunc = (event, note) => {
    event.stopPropagation();
    const reqBody = {
      userId, isArchived: false
    };
    archiveNote(note._id, reqBody).then((res) => {
      setNoteToUpdate(res.data.data);
      updateNotesSuccess(res);
    }).catch((error) => {
      updateNotesError(error);
    });
  }
  /**
     * @description function to handle delete notes
     */
  const handleDeleteNote = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
    const reqBody = {
      userId, isTrashed: true
    };
    trashNote(noteToDelete._id, reqBody).then((res) => {
      setNoteToUpdate(res.data.data);
      updateNotesSuccess(res);
    }).catch((error) => {
      updateNotesError(error);
    });
  }
  /**
     * @description function to pin notes
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
  /**
     * @description function to find all notes
     */
  const findNotes = () => {
    findArchivedNotes(userId).then((res) => {
      setNotes(res.data.data);
    }).catch((error) => {
      updateNotesError(error);
    });
  }
  return (
    <React.Fragment>
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
                        </CardContent>
                        <CardActions id={note._id} className="card-action-panel display-card-action">
                          <Tooltip title="Unarchive"><Button size="small" onClick={(event) => unArchiveNoteFunc(event, note)}><UnarchiveOutlinedIcon></UnarchiveOutlinedIcon></Button></Tooltip>
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
                            <MenuItem onClick={(event) => handleDeleteNote(event)}>Delete note</MenuItem>
                            <MenuItem onClick={(event) => handleMenuClose(event)}>Add label</MenuItem>
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
          handleClickAwayCallback={handleClickAway} note={noteToUpdate}></UpdateNote>
        <Notification notify={notify} setNotify={setNotify} />
      </div >
    </React.Fragment >
  );
}
