import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { IOpportunity } from '../types/ListOpportunity.type';
import { fetchClients, createOpportunity } from '../services/createClient.service';
import { ListClientType } from '../types/ListClient.type';
import { useMutation, useQueryClient } from 'react-query';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CreateOpportunityModalProps = {
    open: boolean;
    onClose: () => void;
    onSuccess: (newOpportunity: IOpportunity) => void;
};

const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({ open, onClose, onSuccess }) => {
    const [clients, setClients] = useState<ListClientType[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(0);
    const [businessName, setBusinessName] = useState<string>('');
    const [businessLine, setBusinessLine] = useState<string>('Outsourcing Resources');
    const [description, setDescription] = useState<string>('');
    const [estimatedValue, setEstimatedValue] = useState<string>('');
    const [estimatedDate, setEstimatedDate] = useState<string>('');
    const [status] = useState<'Open'>('Open');

    const queryClient = useQueryClient();

    const mutation = useMutation(createOpportunity, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('opportunities');

            toast.success("Opportunity created successfully!");

            onSuccess(data);

            setSelectedClientId(0);
            setBusinessName('');
            setBusinessLine('Outsourcing Resources');
            setDescription('');
            setEstimatedValue('');
            setEstimatedDate('');
            setTimeout(() => {
                onClose();
            }, 500);
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
        // Validaciones
        if (selectedClientId === null || selectedClientId === 0) {
            toast.error("Please select a valid client.");
            return;
        }

        if (businessName.trim() === "" || businessName.length < 3) {
            toast.error("Business Name must be at least 3 characters long.");
            return;
        }

        if (businessLine.trim() === "") {
            toast.error("Business Line is required.");
            return;
        }

        if (description.trim() === "" || description.length < 10) {
            toast.error("Description must be at least 10 characters long.");
            return;
        }

        const estimatedValueNumber = parseFloat(estimatedValue);
        if (isNaN(estimatedValueNumber) || estimatedValueNumber <= 0) {
            toast.error("Estimated Business Value must be a positive number.");
            return;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(estimatedDate)) {
            toast.error("Estimated Completion Date must be in the format YYYY-MM-DD.");
            return;
        }

        const newOpportunity: IOpportunity = {
            id: 0,
            clientIds: [selectedClientId],
            businessName,
            businessLine: businessLine as IOpportunity['businessLine'],
            description,
            estimatedValue: estimatedValueNumber,
            estimatedDate,
            status,
        };

        mutation.mutate(newOpportunity);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle className="text-center text-2xl font-bold">New Opportunity</DialogTitle>
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
                            <MenuItem value="" disabled>
                                Select a client
                            </MenuItem>
                            {clients.map((client) => (
                                <MenuItem key={client.id ?? "no-id"} value={client.id ?? ""}>
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
                            helperText="Must be at least 3 characters long."
                        />

                        <TextField
                            select
                            label="Business Line"
                            value={businessLine}
                            onChange={(e) => setBusinessLine(e.target.value)}
                            fullWidth
                            required
                        >
                            <MenuItem value="Outsourcing Resources">Outsourcing Resources</MenuItem>
                            <MenuItem value="Web Development">Web Development</MenuItem>
                            <MenuItem value="Mobile Development">Mobile Development</MenuItem>
                            <MenuItem value="IT Consulting">IT Consulting</MenuItem>
                        </TextField>

                        <TextField
                            label="Opportunity Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            helperText="Must be at least 10 characters long."
                        />

                        <TextField
                            label="Estimated Business Value (COP)"
                            type="text"
                            value={estimatedValue}
                            onChange={(e) => setEstimatedValue(e.target.value)}
                            fullWidth
                            required
                            helperText="Must be a positive number."
                        />

                        <TextField
                            label="Estimated Completion Date"
                            type="date"
                            value={estimatedDate}
                            onChange={(e) => setEstimatedDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                            helperText="Format: YYYY-MM-DD"
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
        </>
    );
};

export default CreateOpportunityModal;