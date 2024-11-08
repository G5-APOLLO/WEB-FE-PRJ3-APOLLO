import { ListClientType } from '../types/ListClient.type';
import { TextField, Box } from '@mui/material';

type ClientFormProps = {
    client: ListClientType;
    onChange: (updatedClient: ListClientType) => void;
  };
  
  const ClientForm: React.FC<ClientFormProps> = ({ client, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange({ ...client, [name]: value });
    };
  
    return (
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="NIT" name="nit" type="number" value={client.nit} onChange={handleInputChange} fullWidth required />
        <TextField label="Name" name="name" type="text" value={client.name} onChange={handleInputChange} fullWidth required />
        <TextField label="Address" name="address" type="text" value={client.address} onChange={handleInputChange} fullWidth />
        <TextField label="City" name="city" type="text" value={client.city} onChange={handleInputChange} fullWidth />
        <TextField label="Country" name="country" type="text" value={client.country} onChange={handleInputChange} fullWidth />
        <TextField label="Phone" name="phone" type="tel" value={client.phone} onChange={handleInputChange} fullWidth />
        <TextField label="Email" name="email" type="email" value={client.email} onChange={handleInputChange} fullWidth required />
      </Box>
    );
  };
  
export default ClientForm;
