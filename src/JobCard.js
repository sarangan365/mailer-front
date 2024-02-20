import { Delete, InsertEmoticonRounded, MarkEmailReadRounded, SentimentSatisfiedRounded, SentimentVeryDissatisfiedRounded } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, IconButton, Typography } from '@mui/material';
import { blue, green, red, yellow } from '@mui/material/colors';
import React from 'react';

const JobCard = ({ job, onUpdateStatus, onDelete }) => {
   const handleChange = (status) => {
      onUpdateStatus(job._id, status);
   };

   const handleDelete = () => {
      onDelete(job._id);
   };
   const getStatusColor = (status) => {
      switch (status) {
         case 'applied':
            return yellow['A700'];
         case 'contacted':
            return blue['A700'];
         case 'selected':
            return green['A700'];
         case 'rejected':
            return red['A700'];
         default:
            return 'inherit'; // or any other default color
      }
   };

   return (
      <Card variant="outlined">
         <CardContent>
            <Typography variant="h6">{job.recruiterName}</Typography>
            <Typography>Email: {job.email}</Typography>
            <Typography>Company: {job.companyName}</Typography>
            <Typography>Role: {job.postName}</Typography>
            <Typography sx={{ color: getStatusColor(job.status) }}>Status: {job.status}</Typography>
            <Typography>Mailed Date: {new Date(job.createdDate).toLocaleDateString()}</Typography>
         </CardContent>
         <CardActions sx={{ justifyContent: 'space-between' }}>
            <div>
               {job.status === 'applied' ? (
                  <FormControlLabel
                     control={<Checkbox
                        checked={job.status === 'contacted'}
                        onChange={() => handleChange('contacted')}
                        disabled={job.status !== 'applied'} // Disable if status is not "applied"
                     />}
                     label="Contacted"
                  />
               ) : (<Typography>
                  <h3>Job status: {job.status}</h3>
               </Typography>)}

               {job.status === 'contacted' && (
                  <>
                     <FormControlLabel
                        control={<Checkbox
                           checked={job.status === 'selected'}
                           onChange={() => handleChange('selected')}
                           disabled={job.status === 'selected' || job.status === 'rejected'} // Disable if status is "selected" or "rejected"
                        />}
                        label="Selected"
                     />
                     <FormControlLabel
                        control={<Checkbox
                           checked={job.status === 'rejected'}
                           onChange={() => handleChange('rejected')}
                           disabled={job.status === 'rejected'} // Disable if status is "rejected"
                        />}
                        label="Rejected"
                     />
                  </>
               )}
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <IconButton onClick={handleDelete} aria-label="delete">
                  <Delete />
               </IconButton>
               {job.status === 'applied' && (
                  <MarkEmailReadRounded color="success" />
               )}
               {job.status === 'rejected' && (
                  <SentimentVeryDissatisfiedRounded sx={{ color: red[400] }} />
               )}
               {job.status === 'contacted' && (
                  <SentimentSatisfiedRounded sx={{ color: yellow['A200'] }} />
               )}
               {job.status === 'selected' && (
                  <InsertEmoticonRounded sx={{ color: green[500] }} />
               )}
            </Box>
         </CardActions>
      </Card>
   );
};

export default JobCard;
