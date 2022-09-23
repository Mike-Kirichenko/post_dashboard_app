import { useState } from "react";
import { Box } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";

const UserPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userBoxStyle = {
    width: "100%",
    position: "fixed",
    zIndex: 5,
    top: "0px",
    right: "0px",
    backgroundColor: "white",
    textAlign: "right"
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={userBoxStyle}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon />
        @mk2294
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={handleClose}>Change password</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserPanel;
