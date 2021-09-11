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
import Chip from '@material-ui/core/Chip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
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
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        flexGrow: 1,
    },
}));
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAddLabel, setAnchorElAddLabel] = useState(null);
    const [note, setNote] = useState(props.note);
    const [showCreateLabel, setShowCreateLabel] = useState(false);
    const [labelName, setLabelName] = useState("");
    const classes = useStyles();
    useEffect(() => {
        setNote(props.note);
    });
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
        props.handleMenuClickCallback(event, note);
    };
    const handleMenuClose = (event) => {
        setAnchorEl(null);
        event.stopPropagation();
        props.handleMenuCloseCallback(event);
    };
    const handleDeleteNote = (event) => {
        setAnchorEl(null);
        event.stopPropagation();
        handleClose();
        props.handleDeleteNoteCallback(event, false, note);
    }
    const handleAddLabel = (event) => {
        setAnchorEl(null);
        setAnchorElAddLabel(event.currentTarget);
        event.stopPropagation();
        props.handleAddLabelCallback(event);
    }
    const handleAddLabelMenuClose = (event) => {
        setAnchorElAddLabel(null);
        setLabelName("");
        setShowCreateLabel(false);
        event.stopPropagation();
        props.handleAddLabelMenuCloseCallback(event);
    }
    const syncLabelName = (event) => {
        if (event.target.value.trim() !== "") {
            setShowCreateLabel(true);
        }
        setLabelName(event.target.value);
        props.syncLabelNameCallback(event);
    }
    const archiveNoteFunc = (event, note) => {
        event.stopPropagation();
        handleClose();
        props.archiveNoteFuncCallback(event, note);
    }
    const handleLabelCheckboxChange = (event, label) => {
        event.stopPropagation();
        event.preventDefault();
        props.handleLabelCheckboxChangeCallback(event, label);
    }
    const createLabelFunc = () => {
        props.createLabelFuncCallback();
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
                        <div className="update-note-container">
                            <div className={note.isPinned ? "pin-note pin" : "pin-note"}
                                onClick={syncIsPinned}></div>
                            <TextField className="update-title" autoComplete="off" id="title-input" placeholder="Title" fullWidth
                                onChange={(event) => syncTitle(event.target.value)} name="title" value={note.title}
                                InputProps={{ disableUnderline: true }} />
                            <TextField className="update-desc" autoComplete="off" id="desc-input" placeholder="Take a note..." fullWidth
                                onChange={(event) => syncDescription(event.target.value)}
                                name="description" value={note.description}
                                InputProps={{ disableUnderline: true }} />
                            <Typography className="chip-section">
                                {note.labels && note.labels.length > 0 && note.labels.filter(lbl => lbl.checked === true).map(label => {
                                    return <Chip className="label-chip" key={label._id} label={label.labelName} onDelete={event => handleLabelDelete(event, note, label)} color="primary" />
                                })}
                            </Typography>
                        </div>
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
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose} className="menu-list"
                        >
                            <MenuItem onClick={(event) => handleDeleteNote(event)}>Delete note</MenuItem>
                            <MenuItem onClick={(event) => handleAddLabel(event)}>Add label</MenuItem>
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
                            {props.labelList && props.labelList.map(lbl => {
                                return <MenuItem key={lbl._id}><Checkbox checked={lbl.checked}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }} onChange={event => handleLabelCheckboxChange(event, lbl)}
                                /> {lbl.labelName}</MenuItem>
                            })}
                            {showCreateLabel && <MenuItem onClick={createLabelFunc}>{`+ Create "${labelName}"`}</MenuItem>}
                        </Menu>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </div>
            </ClickAwayListener >
        </Dialog>
    );
}