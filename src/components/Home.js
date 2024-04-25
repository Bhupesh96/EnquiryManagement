import React from "react";
import Sidenav from "./Sidenav";
import Box from "@mui/material/Box";
import { useAuth } from "./context/AuthContext";

function Home() {
  const auth = useAuth();
  return (
    <>
      <Box sx={{ display: "flex" }} >
      <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>    
          <h1>Home</h1>
          <p>Welcome {auth.user}</p>
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

export default Home;
