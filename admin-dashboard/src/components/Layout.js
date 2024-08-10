import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  return (
    <div className="flex w-full">
      <Navbar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <div className="flex-grow p-4 max-w-full">
        <div className="md:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
