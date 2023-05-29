import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
// import { useGetUserQuery } from "@state/api";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

const Layout = () => {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser()();
  const auth = isAuthenticated();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(auth);
  // const userId = useSelector((state) => state.global.userId);
  // const { data } = useGetUserQuery(userId);
  useEffect(() => {
    setIsSidebarOpen(auth);
  }, [auth]);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {auth && (
        <Sidebar
          user={user}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
      <Box flexGrow={1}>
        <Navbar
          user={user}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
