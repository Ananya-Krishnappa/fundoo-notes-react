import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./Notes.scss";
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
export default function Notes(props) {
    const classes = useStyles();
    /**
     * @description function to display card using id
     */
    const showActionPanel = (id) => {
        document.getElementById("pin" + id).classList.remove("display-card-action");
        document.getElementById(id).classList.remove("display-card-action");
    }
    /**
     * @description function to handle actions on card by id
     */
    const hideActionPanel = (id) => {
        document.getElementById("pin" + id).classList.add("display-card-action");
        document.getElementById(id).classList.add("display-card-action");
    }
    const { note } = props;
    return (
        <Grid key={props.index} item xs={12} sm={6} md={4} lg={4}>
            <Card onMouseOut={() => hideActionPanel(note._id)} onMouseOver={() => showActionPanel(note._id)} className={clsx(classes.root, "note-card")}
                onClick={(event) => props.handleClickOpenCallback(event, note)}>
                <CardContent>
                    <Typography onClick={(event) => props.pinNoteFuncCallback(event, note)} id={"pin" + note._id} className="display-card-action">
                        <div className={note.isPinned ? "pin-note pin" : "pin-note"}></div>
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {note.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {note.description}
                    </Typography>
                    <div className="chip-section">
                        {note.labels && note.labels.length > 0 && note.labels.filter(lbl => lbl.checked === true).map(label => {
                            return <Chip className="label-chip" key={label._id} label={label.labelName} onDelete={event => props.handleLabelDeleteCallback(event, note, label)} color="primary" />
                        })}
                    </div>
                </CardContent>
                <CardActions id={note._id} className="card-action-panel display-card-action">
                    <Tooltip title="Archive">
                        <Button size="small" onClick={(event) => props.archiveNoteFuncCallback(event, note)}>
                            <ArchiveOutlinedIcon></ArchiveOutlinedIcon>
                        </Button>
                    </Tooltip>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true" onClick={(event) => props.handleMenuClickCallback(event, note)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={props.anchorEl}
                        keepMounted
                        open={Boolean(props.anchorEl)}
                        onClose={props.handleMenuCloseCallback} className="menu-list"
                    >
                        <MenuItem onClick={(event) => props.handleDeleteNoteCallback(event, true)}>Delete note</MenuItem>
                        <MenuItem onClick={(event) => props.handleAddLabelCallback(event, true)}>Add label</MenuItem>
                    </Menu>
                    <Menu
                        id="add-label-menu"
                        anchorEl={props.anchorElAddLabel}
                        keepMounted
                        open={Boolean(props.anchorElAddLabel)}
                        onClose={props.handleAddLabelMenuCloseCallback} className="add-label-menu"
                    >
                        <MenuItem>Label note</MenuItem>
                        <MenuItem onKeyDown={(e) => e.stopPropagation()}><TextField autoComplete="off" id="labelName-input"
                            placeholder="Enter label name" fullWidth
                            onChange={(event) => props.syncLabelNameCallback(event)} name="labelName" value={props.labelName}
                            InputProps={{ classes, disableUnderline: true }} /></MenuItem>
                        {props.labelList.map(lbl => {
                            return <MenuItem key={lbl._id}><Checkbox checked={lbl.checked}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={event => props.handleLabelCheckboxChangeCallback(event, lbl)}
                            /> {lbl.labelName}</MenuItem>
                        })}
                        {props.showCreateLabel && <MenuItem onClick={props.createLabelFuncCallback}>{`+ Create "${props.labelName}"`}</MenuItem>}
                    </Menu>
                </CardActions>
            </Card>
        </Grid>
    );
}
