import React, { useContext, useState, useEffect } from "react";
import "./CreateNote.scss";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ClickAwayListener } from '@material-ui/core';
import { createNote, createLabel, findAllLabel } from "../../services/Api";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../Notification";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));
export default function CreateNote(props) {
    const { userId } = useContext(AuthContext);
    const classes = useStyles();
    const [toggleCreateNote, setToggleCreateNote] = useState(false);
    const [showCreateLabel, setShowCreateLabel] = useState(false);
    const [labelName, setLabelName] = useState("");
    const [labelList, setLabelList] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPinned, toggleIsPinned] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAddLabel, setAnchorElAddLabel] = useState(null);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    /**
       * @description handleMenuClose function used to handle on click of close
       */
    const handleMenuClose = (event) => {
        setAnchorEl(null);
        setLabelName("");
        setShowCreateLabel(false);
        event.stopPropagation();
    };
    const handleAddLabelMenuClose = (event) => {
        setAnchorElAddLabel(null);
        setLabelName("");
        setShowCreateLabel(false);
        event.stopPropagation();
    }
    const handleAddLabel = (event) => {
        setAnchorEl(null);
        setAnchorElAddLabel(event.currentTarget);
        event.stopPropagation();
        findAllLabelFunc();
    }
    const findAllLabelFunc = (updateChecked) => {
        findAllLabel().then((res) => {
            setLabelList(res.data.data);
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
    const toggleAccordian = () => {
        setToggleCreateNote(!toggleCreateNote ? true : true);
    }
    const closeAccordian = () => {
        setToggleCreateNote(!toggleCreateNote);
    }
    const handleClickAway = () => {
        setToggleCreateNote(toggleCreateNote ? false : false);
        if (title.trim() !== '' && description.trim() !== '') {
            const noteData = {
                title,
                description,
                isPinned,
                userId,
            };
            createNote(noteData).then((res) => {
                setNotify({
                    isOpen: true,
                    message: "Note created Successfully",
                    type: "success",
                });
                props.createNoteCallback();
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
        setTitle("");
        setDescription("");
        toggleIsPinned(false);
        setLabelName("");
        setShowCreateLabel(false);
    }
    const syncLabelName = (event) => {
        if (event.target.value.trim() !== "") {
            setShowCreateLabel(true);
        }
        setLabelName(event.target.value);
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
            setSelectedLabel([...selectedLabel, { labelId: res.data.data._id, labelName: res.data.data.labelName }]);
            findAllLabelFunc();
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
    const handleLabelCheckboxChange = (event, label) => {
        if (event.target.checked) {
            setSelectedLabel([...selectedLabel, { labelId: label._id, labelName: label.labelName }]);
        } else {
            setSelectedLabel(selectedLabel.filter(l => {
                return l.labelId !== label._id
            }));
        }
    }
    const handleLabelDelete = (event, label) => {
        setSelectedLabel(selectedLabel.filter(l => {
            return l.labelId !== label.labelId
        }));
        event.stopPropagation();
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
                {selectedLabel.length > 0 && selectedLabel.map(label => {
                    return <Chip label={label.labelName} onDelete={event => handleLabelDelete(event, label)} color="primary" />
                })}
                {toggleCreateNote && <div className="create-note-bottom-panel">
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true" onClick={(event) => handleMenuClick(event)}
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
                        {labelList.length > 0 && labelList.map(label => {
                            return <MenuItem key={label._id}><Checkbox
                                color="primary" id={`labelItem${label._id}`}
                                inputProps={{ 'aria-label': 'secondary checkbox' }} onChange={event => handleLabelCheckboxChange(event, label)}
                            /> {label.labelName}</MenuItem>
                        })}
                        {showCreateLabel && <MenuItem onClick={createLabelFunc}>{`+ Create "${labelName}"`}</MenuItem>}
                    </Menu>
                    <button className="close-create-note" onClick={closeAccordian}>Close</button>
                </div>}
                <Notification notify={notify} setNotify={setNotify} />
            </div>
        </ClickAwayListener>
    );
}