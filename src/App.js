import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import cslx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import SearchBox from "./SearchBox";

const ZoomButtons = () => {
  return (
    <>
      <IconButton>
        <AddCircleIcon />
      </IconButton>
      <IconButton>
        <RemoveCircleIcon />
      </IconButton>
    </>
  );
};

const Widget = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.widget}>
      <Typography variant="h5" component="h3">
        {props.title}
      </Typography>
      <Typography component="p">{props.content}</Typography>
    </Paper>
  );
};

const DRAWER_WIDTH = 250;

const useStyles = makeStyles(theme => ({
  list: {
    width: DRAWER_WIDTH
  },
  flexBox: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    padding: theme.spacing(2),
    background: "aliceblue",
    display: "flex",
    flexDirection: "column"
  },
  flexBoxShiftedLeft: {
    left: DRAWER_WIDTH
  },
  header: {
    flex: 0,
    height: theme.spacing(8)
  },
  main: {
    flex: 1,
    display: "flex"
  },
  leftColumn: {
    flex: 1
  },
  rightColumn: {
    marginTop: theme.spacing(-7),
    flex: 0,
    [theme.breakpoints.down("xs")]: {
      marginTop: 0
    }
  },
  controlsColumn: {
    flex: 0,
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(-7),
    [theme.breakpoints.down("xs")]: {
      marginTop: 0
    }
  },
  footer: {
    flex: 0,
    display: "flex",
    justifyContent: "end",
    "& div": {
      marginLeft: theme.spacing(1)
    },
    "& span": {
      lineHeight: "12px",
      padding: "0 10px"
    }
  },
  widget: {
    width: 235,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  iconButton: {
    padding: 10
  },
  toggleDrawerButton: {
    marginRight: 35,
    padding: 12
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between"
  },
  logo: {
    maxHeight: 35,
    padding: 10
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();

  const [visible, setVisible] = React.useState(false);
  const [permanent, setPermanent] = React.useState(false);
  const [mouseOverLock, setMouseOverLock] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setVisible(open);
  };

  const togglePermanent = () => {
    visible && setVisible(false);
    setPermanent(!permanent);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Visa", "Rita", "Exportera", "Navigera"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Översiktsplan", "Editera", "Om kartan"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleMouseEnter = e => {
    setMouseOverLock(true);
  };

  const handleMouseLeave = e => {
    setMouseOverLock(false);
  };

  return (
    <>
      <div
        className={cslx(classes.flexBox, {
          [classes.flexBoxShiftedLeft]: permanent
        })}
      >
        <header className={classes.header}>
          <SearchBox
            onMenuClick={toggleDrawer(!visible)}
            isDisabled={permanent}
          />
        </header>
        <main className={classes.main}>
          <div className={classes.leftColumn}>
            <Hidden xsDown>
              <Widget
                title="Vänster"
                content="Här är en liten widget som ligger där den ligger"
              />
              <Widget
                title="En till"
                content="Här är en liten widget som ligger där den ligger"
              />
            </Hidden>
          </div>
          <div className={classes.rightColumn}>
            <Hidden xsDown>
              <Widget
                title="Right"
                content="Här är en sample widget på höger sida om skärmen"
              />
            </Hidden>
          </div>
          <div className={classes.controlsColumn}>
            <ZoomButtons />
          </div>
        </main>
        <footer className={classes.footer}>
          <Paper>
            <Typography variant="overline" display="block">
              Zoom | Scale
            </Typography>
          </Paper>
          <Paper>
            <Typography variant="overline" display="block">
              Copyright
            </Typography>
          </Paper>
        </footer>
      </div>
      <Drawer
        open={visible}
        onClose={toggleDrawer(false)}
        variant={permanent ? "permanent" : "temporary"}
      >
        <div className={classes.drawerHeader}>
          <img
            alt="Logo"
            className={classes.logo}
            src="https://github.com/hajkmap/Hajk/raw/master/design/logo_small.png"
          />
          <Hidden xsDown>
            <IconButton
              aria-label="pin"
              onClick={togglePermanent}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {permanent ? (
                mouseOverLock ? (
                  <LockOpenIcon />
                ) : (
                  <LockIcon />
                )
              ) : mouseOverLock ? (
                <LockIcon />
              ) : (
                <LockOpenIcon />
              )}
            </IconButton>
          </Hidden>
        </div>
        <Divider />
        {sideList()}
      </Drawer>
    </>
  );
}
