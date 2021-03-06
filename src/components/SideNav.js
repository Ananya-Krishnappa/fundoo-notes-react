import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@material-ui/icons/Archive';
import { AuthContext } from "../context/AuthContext";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notification from "../components/Notification";
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { findAllLabel } from "../services/Api";
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
        background: '#fff',
        color: '#202124',
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
    fundooHeaderTitle: {
        color: '#5f6368',
    }
}));

/**
 * @description sideNav functional component with notes,archive and trash
 * @return sideNavigation bar
 */
export default function SideNav(props) {
    const history = useHistory();
    const { signout } = useContext(AuthContext);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [menuSelected, setMenuSelected] = useState("Notes");
    const [labelList, setLabelList] = useState([]);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    useEffect(() => {
        findLabels();
    }, []);
    const findLabels = () => {
        findAllLabel().then((res) => {
            const labels = res.data.data;
            labels.map(label => {
                label.icon = <LabelOutlinedIcon />;
                label.action = findNotesByLabelName;
                return label;
            });
            setLabelList(labels);
        }).catch((error) => {
            let message;
            message = error.response && error.response.data.message;
            setNotify({
                isOpen: true,
                message: message,
                type: "error",
            });
        });
    }
    /**
    * @description Function to retrieve all notes
    */
    const getAllNotes = () => {
        setMenuSelected("Notes");
        history.push("/fundoo/notes");
        props.syncRouteLabelCallback("all");
    };
    const findNotesByLabelName = (event, labelName) => {
        setMenuSelected(labelName);
        history.push(`/fundoo/notes/${labelName}`);
        props.syncRouteLabelCallback(labelName);
    };
    /**
    * @description Function to retrieve all archive notes
    */
    const getArchivedNotes = () => {
        setMenuSelected("Archive");
        history.push("/fundoo/archive");
    };
    /**
    * @description Function to retrieve all trashed notes
    */
    const getTrashedNotes = () => {
        setMenuSelected("Trash");
        history.push("/fundoo/trash");
    };
    const primaryMenuItems = [
        { name: "Notes", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg>, action: getAllNotes },
    ];
    const secondaryMenuItems = [
        { name: "Archive", icon: <ArchiveIcon />, action: getArchivedNotes },
        { name: "Trash", icon: <DeleteIcon />, action: getTrashedNotes }
    ];
    /**
     * @description Function to handle drawer close
     */
    const toggleDrawer = () => {
        setOpen(!open);
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
                        onClick={toggleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
                    <Typography variant="h6" noWrap className={classes.fundooHeaderTitle}>
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
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {primaryMenuItems.map((item) => (
                        <ListItem button key={item.name} onClick={item.action}
                            className={item.name === menuSelected ? "menu-selected" : ""}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                    {labelList.map((label) => (
                        <ListItem button key={label.labelName} onClick={event => label.action(event, label.labelName)}
                            className={label.labelName === menuSelected ? "menu-selected" : ""}>
                            <ListItemIcon>{label.icon}</ListItemIcon>
                            <ListItemText primary={label.labelName} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {secondaryMenuItems.map((item) => (
                        <ListItem button key={item.name} onClick={item.action}
                            className={item.name === menuSelected ? "menu-selected" : ""}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {props.children}
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}
