import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { IOpportunity } from '../types/ListOpportunity.type';

type OpportunityFormProps = {
  opportunity: IOpportunity;
  onChange: (opportunity: IOpportunity) => void;
};

const OpportunityForm: React.FC<OpportunityFormProps> = ({ opportunity, onChange }) => {
  const statusOrder = ["Open", "In Study", "Purchase Order", "Finalized"];

  const getStatusOptions = () => {
    const currentIndex = statusOrder.indexOf(opportunity.status);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return [opportunity.status];
    return [opportunity.status, statusOrder[currentIndex + 1]];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...opportunity, [name]: name === 'estimatedValue' ? Number(value) : value });
  };

  return (
    <form>
      <TextField
        label="Business Name"
        name="businessName"
        value={opportunity.businessName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Business Line"
        name="businessLine"
        value={opportunity.businessLine}
        onChange={handleChange}
        fullWidth
        margin="normal"
        select
        required
      >
        <MenuItem value="Outsourcing Resources">Outsourcing Resources</MenuItem>
        <MenuItem value="Web Development">Web Development</MenuItem>
        <MenuItem value="Mobile Development">Mobile Development</MenuItem>
        <MenuItem value="IT Consulting">IT Consulting</MenuItem>
      </TextField>
      <TextField
        label="Description"
        name="description"
        value={opportunity.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Estimated Value"
        name="estimatedValue"
        value={opportunity.estimatedValue}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
        required
      />
      <TextField
        label="Estimated Date"
        name="estimatedDate"
        value={opportunity.estimatedDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Status"
        name="status"
        value={opportunity.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
        select
        required
      >
        {getStatusOptions().map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
};

export default OpportunityForm;
