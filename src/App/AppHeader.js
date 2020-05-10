import React, { useState } from 'react';
import './App.css';
import onboard from './onboard.jpg'
import { Box, Button, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

function AppHeader(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  function handleLoad(path) {
    let result = JSON.stringify({ "authVal": true, "user": {"userName": props.user.userName, "userRole": props.user.userRole }});
    props.isAuthenticated(result);
    history.push(path);
  };

  const WelcomeMsg = " Welcome " + props.user.userName+ "(" + props.user.userRole + ") !";

  const handleExit = () => {
    props.isLoggedOut();
  }

  return (
    <div className="App-Header">
      <Box display="flex" justifyContent="center" p={1} m={1}>
        <Box p={1}>
          <img src={onboard} alt="Corporate Onboaring"></img>
        </Box>
        <Box p={1} component="span" style={{ fontSize: 60 }}>
          Corporate Onboaring
          </Box>
      </Box>
      {props.isLoggedIn ?
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={0.5}>
            <Button startIcon={<MenuIcon />} style={{ color: "white" }} aria-controls="simple-menu"
              aria-haspopup="true" onClick={handleClick}></Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={(e) => handleLoad("/")}>Home</MenuItem>
              <MenuItem onClick={(e) => handleLoad("/addcustomer")}>Create/Modify Customer</MenuItem>
              <MenuItem onClick={handleClose}>Search Customer</MenuItem>
              <MenuItem onClick={handleClose}>Delete Customer</MenuItem>
            </Menu>
          </Box>
          <Box p={1}>{WelcomeMsg}</Box>
          <Box p={1} flexGrow={0.5}></Box>
          <Box p={1}>
            <Button startIcon={<ExitToAppIcon />} style={{ color: "white" }} onClick={handleExit}>Logout</Button>
          </Box>
        </Box>
        :
        ""
      }
    </div>
  );

}


export default AppHeader;