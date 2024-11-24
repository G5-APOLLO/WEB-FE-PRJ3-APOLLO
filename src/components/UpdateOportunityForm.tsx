import React, { useRef } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { IOpportunity } from '../types/ListOpportunity.type';

type OpportunityFormProps = {
  opportunity: IOpportunity;
  onChange: (opportunity: IOpportunity) => void;
};

const OpportunityForm: React.FC<OpportunityFormProps> = ({ opportunity, onChange }) => {
  const statusOrder = ["Open", "In Study", "Purchase Order", "Finalized"];
  const currentIndex = statusOrder.indexOf(opportunity.status);

  const statusOptions = useRef<string[]>([
    statusOrder[currentIndex - 1], // Previous status (if exists)
    opportunity.status,            // Current status
    statusOrder[currentIndex + 1],  // Next status (if exists)
  ].filter(Boolean));      

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
        multiline
        rows={3}
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
      {statusOptions.current.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
        ))}
      </TextField>
    </form>
  );
};

export default OpportunityForm;
