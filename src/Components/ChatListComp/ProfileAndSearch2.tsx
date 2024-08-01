import { useState } from "react";
// import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
import { useAppDispatch } from "../../Redux/hooks";
import {
  setShowProfile,
  setShowSettings,
} from "../../Redux/slices/profileSlice";
import { Menu, MenuItem, IconButton, Box, InputBase } from "@mui/material";

const ProfileAndSearch2 = () => {
  const profile = {
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "kanishk",
  };
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    dispatch(setShowSettings(true));
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
      <IconButton
        sx={{ padding: 0 }}
        onClick={() => dispatch(setShowProfile(true))}
      >
        <img
          src={profile.img}
          alt="user profile pic"
          style={{
            objectFit: "cover",
            height: 36,
            width: 36,
            borderRadius: "50%",
          }}
        />
      </IconButton>

      <Box sx={{ position: "relative", flexGrow: 1 }}>
        <InputBase
          placeholder="Search..."
          sx={{
            width: "100%",
            padding: "2px 12px",
            borderRadius: 1,
            backgroundColor: "var(--accent-color)",
            color: "var(--text-primary)",
            "&:focus": {
              boxShadow: 1,
            },
          }}
        />
        <BiSearch
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9e9e9e",
          }}
        />
      </Box>

      <IconButton
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
        sx={{ p: 0 }}
      >
        <BiDotsVerticalRounded
          style={{ fontSize: "1.5rem", color: "var(--text-secondary)" }}
        />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "var(--accent-color)",
            color: "var(--text-primary)",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 0 }}>
          <MenuItem
            onClick={handleMenuItemClick}
            sx={{
              "&:hover": {
                background: "var(--bg-color)",
              },
            }}
          >
            New group
          </MenuItem>
          <MenuItem
            onClick={handleMenuItemClick}
            sx={{
              "&:hover": {
                background: "var(--bg-color)",
              },
            }}
          >
            Starred messages
          </MenuItem>
          <MenuItem
            onClick={handleMenuItemClick}
            sx={{
              "&:hover": {
                background: "var(--bg-color)",
              },
            }}
          >
            Pinned chats
          </MenuItem>
          <MenuItem
            onClick={handleMenuItemClick}
            sx={{
              "&:hover": {
                background: "var(--bg-color)",
              },
            }}
          >
            Settings
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default ProfileAndSearch2;
