import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const JobApplicationForm = ({ onSubmit }) => {
   const [email, setEmail] = useState('');
   const [companyName, setCompanyName] = useState('');
   const [postName, setPostName] = useState('');
   const [recruiterName, setRecruiterName] = useState('');
   const [resume, setResume] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         await onSubmit({ email, companyName, postName, recruiterName, resume });
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   const handleFileChange = (e) => {
      setResume(e.target.files[0]);
   };

   return (
      <Box
         component="form"
         onSubmit={handleSubmit}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '100vh', // Full viewport height
            '& .MuiTextField-root': {
               marginBottom: '1rem',
               width: '80%', // 80% of the parent width
               maxWidth: '500px', // Maximum width for text fields
            },
            '& button': {
               width: '80%', // 80% of the parent width
               maxWidth: '500px', // Maximum width for buttons
            },
         }}
      >
         <Typography variant="h6" gutterBottom>
            Job Application Form
         </Typography>
         <TextField
            type="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
         />
         <TextField
            label="Company Name"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
         />
         <TextField
            label="Post Name"
            fullWidth
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            required
         />
         <TextField
            label="Recruiter's Name"
            fullWidth
            value={recruiterName}
            onChange={(e) => setRecruiterName(e.target.value)}
            required
         />
         <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx"
            style={{ display: 'none' }}
            id="upload-resume"
         />
         <label htmlFor="upload-resume">
            <Button component="span" variant="contained" color="primary" sx={{ marginBottom: '1rem' }}>
               Upload Resume (PDF/DOCX)
            </Button>
         </label>
         <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Send Email"}
         </Button>
      </Box>
   );
};

export default JobApplicationForm;
