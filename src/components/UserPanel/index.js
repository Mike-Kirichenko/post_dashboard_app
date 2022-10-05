import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Box } from '@mui/system';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={userBoxStyle}>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
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
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(event) => setAnchorEl(event.currentTarget)}>
          Edit profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserPanel;
