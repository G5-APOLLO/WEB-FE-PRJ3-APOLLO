import { ListClietnType } from '../types/ListClient.type';
import { TextField, Box } from '@mui/material';

type ClientFormProps = {
    client: ListClietnType;
    onChange: (updatedClient: ListClietnType) => void;
};

const ClientForm: React.FC<ClientFormProps> = ({ client, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...client, [name]: value });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Nit" name="nit" value={client.nit} onChange={handleInputChange} fullWidth required />
            <TextField label="Name" name="name" value={client.name} onChange={handleInputChange} fullWidth required />
            <TextField label="Address" name="address" value={client.address} onChange={handleInputChange} fullWidth />
            <TextField label="City" name="city" value={client.city} onChange={handleInputChange} fullWidth />
            <TextField label="Country" name="country" value={client.country} onChange={handleInputChange} fullWidth />
            <TextField label="Phone" name="phone" value={client.phone} onChange={handleInputChange} fullWidth />
            <TextField label="Email" name="email" value={client.email} onChange={handleInputChange} fullWidth required />
        </Box>
    );
};

export default ClientForm;
