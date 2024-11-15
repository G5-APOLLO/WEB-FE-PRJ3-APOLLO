import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { TrackingActivity } from './TrackingActivitiesTable';

interface UpdateTrackingActivityFormProps {
  activity: TrackingActivity;
  onChange: (activity: TrackingActivity) => void;
}

const UpdateTrackingActivityForm: React.FC<UpdateTrackingActivityFormProps> = ({ activity, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...activity, [name]: value });
  };

  return (
    <form>
      <TextField
        label="Opportunity Name"
        name="opportunityName"
        value={activity.opportunityName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Contact Type"
        name="contactType"
        value={activity.contactType}
        onChange={handleChange}
        fullWidth
        margin="normal"
        select
        required
      >
        <MenuItem value="Call">Call</MenuItem>
        <MenuItem value="Email">Email</MenuItem>
        <MenuItem value="In-Person Meeting">In-person Meeting</MenuItem>
      </TextField>
      <TextField
        label="Contact Date"
        name="contactDate"
        value={activity.contactDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Client Contact"
        name="clientContact"
        value={activity.clientContact}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Sales Executive"
        name="salesExecutive"
        value={activity.salesExecutive}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={activity.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
    </form>
  );
};

export default UpdateTrackingActivityForm;