import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import JobCard from '../Components/JobCard';

const BASE_URL = 'https://mailer-c8c7.onrender.com'; // Define the base URL here

const AppliedJobsPage = ({ onDelete }) => {
   const [appliedJobs, setAppliedJobs] = useState([]);
   const [searchDate, setSearchDate] = useState('');
   const [searchQuery, setSearchQuery] = useState('');
   const [filteredJobs, setFilteredJobs] = useState([]);

   useEffect(() => {
      fetchAppliedJobs();
   }, []);

   useEffect(() => {
      filterJobs();
   }, [appliedJobs, searchDate, searchQuery]);

   const fetchAppliedJobs = async () => {
      try {
         const response = await axios.get(`${BASE_URL}/appliedJobs`);
         setAppliedJobs(response.data);
      } catch (error) {
         console.error('Error fetching applied jobs:', error);
      }
   };

   const updateJobStatus = async (id, newStatus) => {
      try {
         await axios.patch(`${BASE_URL}/appliedJobs/${id}`, { status: newStatus });
         fetchAppliedJobs();
      } catch (error) {
         console.error('Error updating job status:', error);
      }
   };

   const handleDelete = async (id) => {
      try {
         await axios.delete(`${BASE_URL}/appliedJobs/${id}`);
         fetchAppliedJobs();
      } catch (error) {
         console.error('Error deleting job:', error);
      }
   };

   const filterJobs = () => {
      let filtered = appliedJobs;

      // Filter by date
      if (searchDate) {
         filtered = filtered.filter(job => {
            const jobDate = new Date(job.createdDate).toISOString().split('T')[0];
            return jobDate === searchDate;
         });
      }

      // Filter by search query
      if (searchQuery) {
         filtered = filtered.filter(job => {
            return (
               job.recruiterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.status.toLowerCase().includes(searchQuery.toLowerCase())
            );
         });
      }

      setFilteredJobs(filtered);
   };

   const handleSearch = () => {
      // Perform search based on selected date and search query
      filterJobs();
   };

   const handleReset = () => {
      // Reset the search date and search query
      setSearchDate('');
      setSearchQuery('');
      setFilteredJobs(appliedJobs);
   };

   return (
      <div>
         <Typography variant="h4" align="center" gutterBottom>Applied Jobs</Typography>
         <Grid container spacing={2} alignItems="center" justifyContent="center" mt={2}>
            <Grid item xs={12} sm={3}>
               <TextField
                  id="date"
                  label="Search by Date"
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  InputLabelProps={{
                     shrink: true,
                  }}
                  fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={5}>
               <TextField
                  id="search"
                  label="Search by Any Criteria"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={4} container alignItems="center" justifyContent="flex-start">
               <Button variant="contained" onClick={handleSearch} sx={{ marginRight: '1rem' }}>Search</Button>
               <Button variant="contained" onClick={handleReset}>Reset</Button>
            </Grid>
         </Grid>

         <Grid container spacing={2} marginTop={2}>
            {filteredJobs.map(job => (
               <Grid item xs={12} sm={6} key={job._id}>
                  <JobCard job={job} onUpdateStatus={updateJobStatus} onDelete={handleDelete} />
               </Grid>
            ))}
         </Grid>
      </div>
   );
};

export default AppliedJobsPage;
