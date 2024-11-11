import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { IOpportunity } from '../types/ListOpportunity.type';
import { fetchClients, createOpportunity } from '../services/createClient.service';
import { ListClientType } from '../types/ListClient.type';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type CreateOpportunityModalProps = {
    open: boolean;
    onClose: () => void;
    onSuccess: (newOpportunity: IOpportunity) => void;
};

const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({ open, onClose }) => {
    const [clients, setClients] = useState<ListClientType[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [businessName, setBusinessName] = useState<string>('');
    const [businessLine, setBusinessLine] = useState<string>('Outsourcing Resources');
    const [description, setDescription] = useState<string>('');
    const [estimatedValue, setEstimatedValue] = useState<string>('');
    const [estimatedDate, setEstimatedDate] = useState<string>('');
    const [status] = useState<'Open'>('Open');

    const queryClient = useQueryClient();

    const mutation = useMutation(createOpportunity, {
        onSuccess: () => {
            queryClient.invalidateQueries('opportunities');
            toast.success("Opportunity created successfully!");
            setSelectedClientId(null);
            setBusinessName('');
            setBusinessLine('Outsourcing Resources');
            setDescription('');
            setEstimatedValue('');
            setEstimatedDate('');
            onClose();
        },
        onError: () => {
            toast.error("Failed to create opportunity.");
        },
    });

    useEffect(() => {
        const loadClients = async () => {
            const clientData = await fetchClients();
            setClients(clientData);
        };
        if (open) loadClients();
    }, [open]);

    const handleSave = () => {
        if (
            selectedClientId === null ||
            businessName.trim() === "" ||
            businessLine.trim() === "" ||
            description.trim() === "" ||
            !estimatedValue ||
            estimatedDate.trim() === ""
        ) {
            toast.error("All fields are required.");
            return;
        }

        const newOpportunity: IOpportunity = {
            id: null,
            clientIds: [selectedClientId],
            businessName,
            businessLine: businessLine as IOpportunity['businessLine'],
            description,
            estimatedValue: parseFloat(estimatedValue),
            estimatedDate,
            status,
        };

        mutation.mutate(newOpportunity);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Create New Opportunity</DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            select
                            label="Client"
                            value={selectedClientId}
                            onChange={(e) => setSelectedClientId(Number(e.target.value))}
                            fullWidth
                            required
                        >
                            {Array.isArray(clients) && clients.map((client) => (
                                <MenuItem key={client.id} value={client.id}>
                                    {client.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Business Name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            select
                            label="Business Line"
                            value={businessLine}
                            onChange={(e) => setBusinessLine(e.target.value)}
                            fullWidth
                            required
                        >
                            <MenuItem value="Outsourcing Resources">Outsourcing Recursos</MenuItem>
                            <MenuItem value="Web Development">Desarrollo Web</MenuItem>
                            <MenuItem value="Mobile Development">Desarrollo Mobile</MenuItem>
                            <MenuItem value="IT Consulting">Consultoría TI</MenuItem>
                        </TextField>

                        <TextField
                            label="Opportunity Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                            multiline
                            rows={4}
                        />

                        <TextField
                            label="Estimated Business Value (COP)"
                            type="text" // Cambiado a 'text'
                            value={estimatedValue}
                            onChange={(e) => setEstimatedValue(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Estimated Completion Date"
                            type="date"
                            value={estimatedDate}
                            onChange={(e) => setEstimatedDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Opportunity Status"
                            value={status}
                            disabled
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default CreateOpportunityModal;
