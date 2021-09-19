import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import "./Notes.scss";
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
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
    const [note, setNote] = useState(props.note);
    useEffect(() => {
        setNote(props.note);
    }, [props.note]);
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
    return (
        <Grid key={props.index} item xs={12} sm={6} md={4} lg={4}>
            <Card onMouseOut={() => hideActionPanel(note._id)} onMouseOver={() => showActionPanel(note._id)} className={clsx(classes.root, "note-card")}
                onClick={(event) => props.handleClickOpenCallback(event, note)}>
                <CardContent>
                    <div onClick={(event) => props.pinNoteFuncCallback(event, note)} id={"pin" + note._id} className="display-card-action">
                        <div className={note.isPinned ? "pin-note pin" : "pin-note"}></div>
                    </div>
                    <div className={classes.title} color="textSecondary">
                        {note.title}
                    </div>
                    <div variant="body2" component="p">
                        {note.description}
                    </div>
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
                        id="more-action-button"
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true" onClick={(event) => props.handleMenuClickCallback(event, note)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}
