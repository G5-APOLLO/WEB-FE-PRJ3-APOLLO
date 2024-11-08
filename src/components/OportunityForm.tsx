import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { IOpportunity } from '../types/ListOpportunity.type';

type OpportunityFormProps = {
  opportunity: IOpportunity;
  onChange: (opportunity: IOpportunity) => void;
};

const OpportunityForm: React.FC<OpportunityFormProps> = ({ opportunity, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...opportunity, [name]: value });
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
      />
      <TextField
        label="Business Line"
        name="businessLine"
        value={opportunity.businessLine}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={opportunity.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Estimated Value"
        name="estimatedValue"
        value={opportunity.estimatedValue}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
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
      />
      <TextField
        label="Status"
        name="status"
        value={opportunity.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
        select
      >
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="In Study">In Study</MenuItem>
        <MenuItem value="Purchase Order">Purchase Order</MenuItem>
        <MenuItem value="Finalized">Finalized</MenuItem>
      </TextField>
    </form>
  );
};

export default OpportunityForm;