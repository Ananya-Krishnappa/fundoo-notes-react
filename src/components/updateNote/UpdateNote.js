import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ClickAwayListener } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import "./UpdateNote.scss";
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

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
    const handleClose = () => {
        props.handleCloseCallback();
    };
    useEffect(() => {
        setNote(props.note);
    });
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
    return (
        <Dialog onClose={handleClose} className="update-note-modal" aria-labelledby="customized-dialog-title" open={props.isModalOpen}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    <DialogContent dividers>
                        <div className="update-note-container">
                            <React.Fragment><div className={note.isPinned ? "pin-note pin" : "pin-note"}
                                onClick={syncIsPinned}></div>
                                <TextField className="update-title" autoComplete="off" id="title-input" placeholder="Title" fullWidth
                                    onChange={(event) => syncTitle(event.target.value)} name="title" value={note.title}
                                    InputProps={{ disableUnderline: true }} /></React.Fragment>
                            <TextField className="update-desc" autoComplete="off" id="desc-input" placeholder="Take a note..." fullWidth
                                onChange={(event) => syncDescription(event.target.value)}
                                name="description" value={note.description}
                                InputProps={{ disableUnderline: true }} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </div>
            </ClickAwayListener >
        </Dialog>
    );
}