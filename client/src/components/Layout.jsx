import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes where you don't want to show the Navbar
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <>
      {/* Conditionally render the Navbar based on the current route */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      {/* Render the children (the actual Routes) */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
