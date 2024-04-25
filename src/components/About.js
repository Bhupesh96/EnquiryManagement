import React from "react";
import Sidenav from "./Sidenav";
import Box from "@mui/material/Box";

function About() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            nihil consequuntur corporis dolorum vitae. Ab id dolores corrupti
            neque alias sapiente assumenda? Nostrum consequatur dolor sint
            adipisci animi rerum ullam!
          </p>
        </Box>
      </Box>
    </>
  );
}

export default About;
