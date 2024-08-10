import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


const Navbar = ({ open, toggleDrawer }) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dash">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dash/users">
            <ListItemText primary="Users Listing" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dash/posts">
            <ListItemText primary="Posts Listing" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Drawer */}
      <div className="block md:hidden">
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gray-800 min-h-screen p-4">
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col space-y-3">
            <li
              className={`rounded-md pt-2 pb-2 pl-3 ${
                location === "/dash" ? "bg-black" : ""
              }`}
            >
              <Link className="text-white hover:text-gray-300" to="/dash">
                Home
              </Link>
            </li>
            <li
              className={`rounded-md pt-2 pb-2 pl-3 ${
                location === "/dash/users" ? "bg-black" : ""
              }`}
            >
              <Link className="text-white hover:text-gray-300" to="/dash/users">
                Users Listing
              </Link>
            </li>
            <li
              className={`rounded-md pt-2 pb-2 pl-3 ${
                location === "/dash/posts" ? "bg-black" : ""
              }`}
            >
              <Link className="text-white hover:text-gray-300" to="/dash/posts">
                Posts Listing
              </Link>
            </li>
          </ul>
          <button
            className="mt-4 w-full text-black font-semibold pt-2 pb-2 text-lg bg-white rounded-md"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
