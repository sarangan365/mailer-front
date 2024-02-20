// NavBar.jsx
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
   const location = useLocation();

   return (
      <AppBar position="fixed">
         <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               Job Application
            </Typography>
            <div>
               <Link to="/apply" style={{ marginRight: '1rem', textDecoration: 'none', color: location.pathname === '/apply' ? '#fff' : '#ccc' }}>Apply</Link>
               <Link to="/applied" style={{ marginRight: '1rem', textDecoration: 'none', color: location.pathname === '/applied' ? '#fff' : '#ccc' }}>Applied Jobs</Link>
            </div>
         </Toolbar>
      </AppBar>
   );
};

export default NavBar;
