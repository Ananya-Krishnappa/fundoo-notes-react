import React from "react";
import "./Dashboard.css";
import SideNav from "../SideNav";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect, Switch } from "react-router-dom";
import ArchiveNote from "../archiveNote/ArchiveNote";
import TrashNote from "../trashNote/TrashNote";
import AllNote from "../allNote/AllNote";
const useStyles = makeStyles((theme) => ({
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
/**
 * @description dashboard functional component 
 */
export default function Dashboard(props) {
  const classes = useStyles();
  return (
    <div>
      <div className="container-fluid">
        <SideNav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/fundoo/notes" render={(props) => (
                <AllNote />
              )} />
              <Route path="/fundoo/archive" render={(props) => (
                <ArchiveNote />
              )} />
              <Route path="/fundoo/trash" render={(props) => (
                <TrashNote />
              )} />
              <Redirect to="/fundoo/notes" />
            </Switch>
          </main>
        </SideNav>
      </div>
    </div>
  );
}
