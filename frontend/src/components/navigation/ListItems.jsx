import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import FaceIcon from "@material-ui/icons/Face";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import LibraryIcon from "@material-ui/icons/LibraryBooks";
import { Link, BrowserRouter as Router } from "react-router-dom";


export const mainListItems = (
  <div>
    <Router>
      {/* Clicking this does not make the page re-render */}
      <Link to="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <ListItem button>
        <ListItemIcon>
          <LibraryIcon />
        </ListItemIcon>
        <ListItemText primary="Library" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Directory" />
      </ListItem>
    </Router>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset></ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <FaceIcon />
      </ListItemIcon>
      <ListItemText primary="My profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
