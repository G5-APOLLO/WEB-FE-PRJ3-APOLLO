import React, { useState } from 'react';
import { TextField, MenuItem, Box, Button } from '@mui/material';
import { TrackingActivity } from '../types/TrackingActivity.type';
import { toast } from 'react-toastify';

interface CreateTrackingActivityFormProps {
    onSave: (activity: TrackingActivity) => void;
    onCancel: () => void;
    isLoading: boolean;
    isLoadingContacts: boolean;
    clients: { id: number; name: string }[];
}

const CreateTrackingActivityForm: React.FC<CreateTrackingActivityFormProps> = ({
    onSave,
    onCancel,
    isLoading,
    clients,
    isLoadingContacts,
}) => {
    const [activity, setActivity] = useState<TrackingActivity>({
        id: 0,
        opportunityId: 0,
        opportunityName: '',
        contactType: '',
        contactDate: '',
        clientContact: '',
        salesExecutive: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setActivity(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (
            !activity.contactType ||
            !activity.contactDate ||
            !activity.clientContact ||
            !activity.salesExecutive ||
            !activity.description
        ) {
            toast.error('All fields are required');
            return;
        }
        onSave(activity);
    };

    return (
        <form>
            <TextField
                label="Client Contact"
                name="clientContact"
                value={activity.clientContact}
                onChange={handleChange}
                fullWidth
                margin="normal"
                select
                required
                disabled={isLoading || isLoadingContacts}
            >
                {isLoadingContacts ? (
                    <MenuItem disabled>Cargando contactos...</MenuItem>
                ) : clients.length > 0 ? (
                    clients.map(client => (
                        <MenuItem key={client.id} value={client.id}>
                            {client.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No hay contactos disponibles</MenuItem>
                )}
            </TextField>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={onCancel} color="secondary" disabled={isLoading}>
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </form>
    );
};

export default CreateTrackingActivityForm;
