import React from 'react'
import { Box } from '@mui/material'
import Sidenav from './Sidenav'

const unauthorized = () => {
  return (
    <>
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <h1>This page is accessible by admin only!!</h1>
      </Box>
    </Box>
  </>
)}

export default unauthorized