import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./CardList.scss";
import Grid from '@material-ui/core/Grid';
import UpdateNote from "../updateNote/UpdateNote";
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
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState({});
    const handleClickOpen = (event, updateNote) => {
        setOpen(true);
        setNote(updateNote);
    };
    const handleClose = (noteData) => {
        setOpen(false);
    };
    return (
        <div className="note-list-container">
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" xs={12} >
                        {
                            props.notes !== undefined && props.notes.map((note, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                        <Card className={clsx(classes.root, "note-card")} onClick={(event) => handleClickOpen(event, note)}>
                                            <CardContent>
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
            <UpdateNote isModalOpen={open} handleCloseCallback={handleClose} note={note}></UpdateNote>
        </div>
    );
}
