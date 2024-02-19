import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // Import useSnackbar from Notistack
import React, { useState } from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [postName, setPostName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!email || !companyName || !postName || !recruiterName || !resume) {
      enqueueSnackbar('Please fill in all fields.', { variant: 'error' }); // Show error notification
      return;
    }

    // Check if email format is valid
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      enqueueSnackbar('Please enter a valid email address.', { variant: 'error' }); // Show error notification
      return;
    }

    setLoading(true);
    try {
      // Check if resume is uploaded and its type is PDF or DOCX
      if (!resume || (resume.type !== 'application/pdf' && resume.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        enqueueSnackbar('Please upload a PDF or DOCX file for the resume.', { variant: 'error' }); // Show error notification
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('email', email);
      formData.append('companyName', companyName);
      formData.append('postName', postName);
      formData.append('recruiterName', recruiterName);
      formData.append('resume', resume);

      await axios.post('https://mailerrev.onrender.com/sendEmail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      enqueueSnackbar('Email sent successfully', { variant: 'success' }); // Show success notification
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error sending email', { variant: 'error' }); // Show error notification
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Send Email</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Company Name"
          fullWidth
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Post Name"
          fullWidth
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Recruiter's Name"
          fullWidth
          value={recruiterName}
          onChange={(e) => setRecruiterName(e.target.value)}
          required
          margin="normal"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.docx"
          required
          style={{ display: 'none' }}
          id="upload-resume"
        />
        <label htmlFor="upload-resume">
          <Button component="span" variant="contained" color="primary" margin="normal">
            Upload Resume (PDF/DOCX)
          </Button>
        </label>
        <Button type="submit" variant="contained" color="primary" fullWidth margin="normal" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Send Email"}
        </Button>
      </Box>
    </Container>
  );
}

export default App;
