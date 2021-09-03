import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from '@material-ui/icons/Note';
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@material-ui/icons/Archive';
import CardList from "./CardList";
import { AuthContext } from "../auth/AuthContext";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { findAllNotes, findTrashedNotes, findArchivedNotes } from "../services/Api";
import Notification from "../components/Notification";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#17a2b8 !important'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    logoutButton: {
        position: 'absolute',
        top: 8,
        right: 20
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
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
}));

export default function MiniDrawer(props) {
    const { signout, userId } = useContext(AuthContext);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    useEffect(() => {
        setNotes(props.notes);
    });
    const getNotesSuccess = (res) => {
        if (res.data.success === true) {
            setNotes(res.data.data);
            setNotify({
                isOpen: true,
                message: "Notes retrieved successfully",
                type: "success",
            });
        } else {
            setNotify({
                isOpen: true,
                message: res.message,
                type: "error",
            });
        }
    }
    const getNotesError = (error) => {
        let message;
        if (error.message.includes("500")) {
            message = "Error while retrieving the notes";
        }
        else if ((error.message.includes("400"))) {
            message = "Bad request";
        }
        else {
            message = error.response && error.response.data.message;
        }
        setNotify({
            isOpen: true,
            message: message,
            type: "error",
        });
    }
    const getAllNotes = () => {
        findAllNotes(userId).then((res) => {
            getNotesSuccess(res);
        }).catch((error) => {
            getNotesError(error);
        });
    };
    const getArchivedNotes = () => {
        findTrashedNotes(userId).then((res) => {
            getNotesSuccess(res);
        }).catch((error) => {
            getNotesError(error);
        });
    };
    const getTrashedNotes = () => {
        findArchivedNotes(userId).then((res) => {
            getNotesSuccess(res);
        }).catch((error) => {
            getNotesError(error);
        });
    };
    const primaryMenuItems = [
        { name: "Notes", icon: <NoteIcon />, action: getAllNotes },
    ];
    const secondaryMenuItems = [
        { name: "Archive", icon: <ArchiveIcon />, action: getArchivedNotes },
        { name: "Trash", icon: <DeleteIcon />, action: getTrashedNotes }
    ];
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        FundooNotes
                    </Typography>
                </Toolbar>
                <IconButton
                    color="inherit"
                    onClick={signout}
                    edge="end"
                    className={clsx(classes.logoutButton)}
                >
                    <ExitToAppIcon></ExitToAppIcon>
                </IconButton>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {primaryMenuItems.map((item) => (
                        <ListItem button key={item.name} onClick={item.action}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {secondaryMenuItems.map((item) => (
                        <ListItem button key={item.name} onClick={item.action}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <CardList notes={notes}></CardList>
            </main>
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}