import React, { useState } from "react";
import "./Dashboard.css";
import SideNav from "../SideNav";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect, Switch } from "react-router-dom";
import ArchiveNote from "../archiveNote/ArchiveNote";
import TrashNote from "../trashNote/TrashNote";
import AllNote from "../allNote/AllNote";
import ErrorBoundary from "../errorPage/ErrorPage";
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
  const [routeLabel, setRouteLabel] = useState("all");
  const syncRouteLabel = (labelName) => {
    setRouteLabel(labelName);
  };
  return (
    <div>
      <div className="container-fluid">
        <ErrorBoundary>
          <SideNav syncRouteLabelCallback={syncRouteLabel}>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route path="/fundoo/notes/:labelName" render={() => (
                  <AllNote {...props} routeLabel={routeLabel} />
                )} />
                <Route path="/fundoo/archive" render={(props) => (
                  <ArchiveNote />
                )} />
                <Route path="/fundoo/trash" render={(props) => (
                  <TrashNote />
                )} />
                <Redirect to="/fundoo/notes/all" />
              </Switch>
            </main>
          </SideNav>
        </ErrorBoundary>
      </div>
    </div>
  );
}
