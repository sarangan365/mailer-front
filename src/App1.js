import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // Import useSnackbar from Notistack
import React, { useEffect, useState } from 'react';
import JobApplicationForm from './JobApplicationForm';
import JobCard from './JobCard';

const BASE_URL = 'https://mailer-c8c7.onrender.com'; // Define the base URL here

const App = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  useEffect(() => {
    fetchAppliedJobs();
  }, []); // Fetch applied jobs when component mounts

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/appliedJobs`); // Use BASE_URL here
      setAppliedJobs(response.data);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      // Submit the job application
      await axios.post(`${BASE_URL}/sendEmail`, formData, { // Use BASE_URL here
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      enqueueSnackbar('Email sent successfully', { variant: 'success' }); // Show success notification
      fetchAppliedJobs(); // Fetch applied jobs after submitting application
    } catch (error) {
      console.error('Error sending email:', error);
      enqueueSnackbar('Error sending email', { variant: 'error' }); // Show error notification
    }
  };

  const updateJobStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${BASE_URL}/appliedJobs/${id}`, { status: newStatus }); // Use BASE_URL here
      enqueueSnackbar('Job status updated successfully', { variant: 'success' });
      fetchAppliedJobs(); // Fetch applied jobs after updating job status
    } catch (error) {
      console.error('Error updating job status:', error);
      enqueueSnackbar('Error updating job status', { variant: 'error' });
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/appliedJobs/${id}`); // Use BASE_URL here
      enqueueSnackbar('Job deleted successfully', { variant: 'success' });
      fetchAppliedJobs(); // Fetch applied jobs after deleting job
    } catch (error) {
      console.error('Error deleting job:', error);
      enqueueSnackbar('Error deleting job', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>Job Application Form</Typography>
      <JobApplicationForm onSubmit={handleSubmit} />
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>Applied Jobs</Typography>
        {appliedJobs.map(job => (
          <JobCard key={job._id} job={job} onUpdateStatus={updateJobStatus} onDelete={deleteJob} />
        ))}
      </Box>
    </Container>
  );
};

export default App;
