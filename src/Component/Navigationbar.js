import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Navigationbar() {
 

  return (
    <Box sx={{ flexGrow: 1, width: "100cw" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "25px" }}>Insurence</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 5 }}>
          </Typography >
          <Link to="/bargraph" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Graph</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
