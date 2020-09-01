import React, { useState, useEffect } from 'react';
import axios from "axios";
import dotenv from "dotenv";
import clsx from "clsx";
import AppRoutes from "./AppRoutes";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Typography,
  Badge,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AddCircle as AddIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Face as FaceIcon,
  ExitToApp as LogoutIcon,
  LibraryBooks as LibraryIcon,
} from "@material-ui/icons";
import logo from '../images/logo.png';
import logoPure from '../images/logo-pure.png';


// ------------------------------------ config ------------------------------------ //

dotenv.config();
let url = process.env.REACT_APP_URL;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#292b2c",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: '1500px'
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

// ------------------------------------ component ------------------------------------ //


export default function MainFrame(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const documents = useDocument();
  const users = useUsers();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const listTop = (
    <div>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Link to="/library">
        <ListItem button>
          <ListItemIcon>
            <LibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Library" />
        </ListItem>
      </Link>

      <Link to="/directory">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Directory" />
        </ListItem>
      </Link>
    </div>
  );
  
  const listLoggedIn = (
    <div>
      <Link to="/users/:id">
        <ListItem button>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="My profile" />
        </ListItem>
      </Link>

      <ListItem button onClick={props.handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
  
  const listNotLoggedIn = (
    <div>
      <Link to="/login">
        <ListItem button>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </Link>
    </div>
  );

  return (
    <div className={classes.root}>
      {/* top navbar */}
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/*  side drawer */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {open && (
            <img
              src={logo}
              style={{ height: "9rem" }}
              onClick={handleDrawerClose}
              alt=""
            ></img>
          )}
        </div>
        <Divider />
        <List>
          <Link to="/documents/new">
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New document" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>{listTop}</List>
        <Divider />
        <List>{props.isAuth ? listLoggedIn : listNotLoggedIn}</List>
      </Drawer>

      {/* main body */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* router for rendering the main body content */}
          <AppRoutes {...props} documents={documents} users={users} />
        </Container>
      </main>
    </div>
  );
}

// ------------------------------------ get all documents ------------------------------------ //

function useDocument() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/documents`)
      .then((res) => {
        setDocuments(res.data.documents);
      })
      .catch((e) => console.log(e));
  }, []);

  return documents;
}

// ------------------------------------ get all users ------------------------------------ //

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/users`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((e) => console.log(e));
  }, []);

  return users;
}
