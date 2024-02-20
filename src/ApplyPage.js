// ApplyPage.js
import { Typography } from '@mui/material';
import React from 'react';
import JobApplicationForm from './JobApplicationForm';

const ApplyPage = ({ onSubmit }) => {
   return (
      <div>
         <Typography variant="h4" align="center" gutterBottom>Job Application Form</Typography>
         <JobApplicationForm onSubmit={onSubmit} />
      </div>
   );
};

export default ApplyPage;
