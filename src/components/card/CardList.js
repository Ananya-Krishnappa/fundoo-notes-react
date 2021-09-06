import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import "./CardList.scss";
import Grid from '@material-ui/core/Grid';
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
export default function Dashboard(props) {
    const classes = useStyles();
    return (
        <div className="note-list-container">
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" xs={12} >
                        {
                            props.notes !== undefined && props.notes.map((note, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                        <Card className={clsx(classes.root, "note-card")}>
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    {note.title}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {note.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
