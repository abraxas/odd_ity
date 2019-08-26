import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import Typography from '@material-ui/core/Typography';

export default function Header() {
  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6">
        O.D.D - ity
      </Typography>
    </Toolbar>
  </AppBar>
}
