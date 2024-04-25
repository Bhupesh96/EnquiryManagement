import React from "react";
import Sidenav from "./Sidenav";
import Box from "@mui/material/Box";

function Settings() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <h1>Settings</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            ullam expedita aut recusandae? Quas at odit rerum nesciunt, officia
            vero reiciendis veritatis minus fuga dolor earum vel, ad nobis
            aspernatur.
          </p>
        </Box>
      </Box>
    </>
  );
}

export default Settings;
