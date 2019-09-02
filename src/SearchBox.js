import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    minWidth: 200,
    marginBottom: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function SearchBox(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Tooltip title="Visa verktygspanelen">
        <IconButton
          onClick={props.onMenuClick}
          className={classes.iconButton}
          disabled={props.isDisabled}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <InputBase
        className={classes.input}
        placeholder="Sök i Hajk"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Tooltip title="Sök i Hajk">
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title="Visa fler sökalternativ">
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="MoreHoriz"
        >
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
