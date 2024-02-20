// App.jsx
import { Container } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import AppliedJobsPage from './Pages/AppliedJobsPage';
import ApplyPage from './Pages/ApplyPage';

const BASE_URL = 'https://mailer-c8c7.onrender.com';

const App = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (formData) => {
    console.log("formdata", formData)
    try {
      await axios.post(`${BASE_URL}/sendEmail`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      enqueueSnackbar('Email sent successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error sending email:', error);
      enqueueSnackbar('Error sending email', { variant: 'error' });
    }
  };

  return (
    <Router>
      <NavBar />
      <Container maxWidth="md" sx={{ paddingTop: '80px' }}> {/* Add paddingTop to account for the fixed navbar */}
        <Routes>
          <Route path="/apply" element={<ApplyPage onSubmit={handleSubmit} />} />
          <Route path="/applied" element={<AppliedJobsPage />} />
          {/* Add a default route to redirect to /apply */}
          <Route path="*" element={<ApplyPage onSubmit={handleSubmit} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
