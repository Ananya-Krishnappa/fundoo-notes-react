import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { ClickAwayListener } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import "./UpdateNote.scss";

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function UpdateNote(props) {
    const [note, setNote] = useState(props.note);
    useEffect(() => {
        setNote(props.note);
    });
    const handleMenuClick = (event) => {
        event.stopPropagation();
        props.handleMenuClickCallback(event, note);
    };
    const archiveNoteFunc = (event, note) => {
        event.stopPropagation();
        handleClose();
        props.archiveNoteFuncCallback(event, note);
    }
    const handleClose = () => {
        props.handleCloseCallback();
    };
    const handleClickAway = () => {
        props.handleClickAwayCallback(note);
    }
    const syncTitle = (title) => {
        setNote(note.title = title);
    }
    const syncDescription = (description) => {
        setNote(note.description = description);
    }
    const syncIsPinned = () => {
        setNote(note.isPinned = !note.isPinned);
    }
    const handleLabelDelete = (event, note, label) => {
        event.stopPropagation();
        props.handleLabelDeleteCallback(event, note, label);
    }
    return (
        <Dialog onClose={handleClose} className="update-note-modal" aria-labelledby="customized-dialog-title" open={props.isModalOpen}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    <DialogContent dividers>
                        {note && <div className="update-note-container">
                            <div className={note.isPinned ? "pin-note pin" : "pin-note"}
                                onClick={syncIsPinned}></div>
                            <TextField className="update-title" autoComplete="off" id="title-input" placeholder="Title" fullWidth
                                onChange={(event) => syncTitle(event.target.value)} name="title" value={note.title}
                                InputProps={{ disableUnderline: true }} />
                            <TextField className="update-desc" autoComplete="off" id="desc-input" placeholder="Take a note..." fullWidth
                                onChange={(event) => syncDescription(event.target.value)}
                                name="description" value={note.description}
                                InputProps={{ disableUnderline: true }} />
                            <div className="chip-section">
                                {note.labels && note.labels.length > 0 && note.labels.filter(lbl => lbl.checked === true).map(label => {
                                    return <Chip className="label-chip" key={label._id} label={label.labelName} onDelete={event => handleLabelDelete(event, note, label)} color="primary" />
                                })}
                            </div>
                        </div>}
                    </DialogContent>
                    <DialogActions>
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
                        <Button autoFocus onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </div>
            </ClickAwayListener >
        </Dialog>
    );
}