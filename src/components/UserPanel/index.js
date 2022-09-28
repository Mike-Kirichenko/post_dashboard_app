import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Box } from '@mui/system';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const UserPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userBoxStyle = {
    width: '100%',
    position: 'fixed',
    zIndex: 5,
    top: '0px',
    right: '0px',
    backgroundColor: 'white',
    textAlign: 'right',
  };

  const { firstName, lastName, avatar } = jwt_decode(
    localStorage.getItem('token')
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={userBoxStyle}>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt='avatar' src={avatar}>
          {firstName[0]}
          {lastName[0]}
        </Avatar>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Edit profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserPanel;
