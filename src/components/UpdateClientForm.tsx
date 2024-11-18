import React, { useState, useEffect, useCallback } from 'react';
import { ListClientType, Contact } from '../types/ListClient.type';
import { TextField, Box, Button } from '@mui/material';

type UpdateClientFormProps = {
    client: ListClientType;
    onChange: (updatedClient: ListClientType) => void;
    onContactsChange: (contacts: Contact[]) => void;
    onFormValidityChange: (isValid: boolean) => void;
    contacts?: Contact[];
};

const UpdateClientForm: React.FC<UpdateClientFormProps> = ({ client, onChange, onContactsChange, onFormValidityChange, contacts = [] }) => {
    const [errors, setErrors] = useState({
        nit: '',
        name: '',
        email: '',
        phone: '',
    });

    const [contactErrors, setContactErrors] = useState<Contact[]>([]);
    const [localContacts, setLocalContacts] = useState<Contact[]>(contacts);

    const validateForm = useCallback(() => {
        const isClientValid =
            !errors.nit &&
            !errors.name &&
            !errors.email &&
            !errors.phone &&
            !!client.nit &&
            !!client.name &&
            !!client.email &&
            !!client.phone;

        const areContactsValid = localContacts.every((contact, index) => (
            !contactErrors[index]?.firstName &&
            !contactErrors[index]?.phone &&
            !contactErrors[index]?.email &&
            !!contact.firstName &&
            !!contact.phone &&
            !!contact.email
        ));

        return isClientValid && areContactsValid;
    }, [errors, client, localContacts, contactErrors]);

    useEffect(() => {
        onFormValidityChange(validateForm());
    }, [validateForm, onFormValidityChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'nit':
                if (!/^\d{1,10}$/.test(value)) {
                    setErrors((prev) => ({ ...prev, nit: 'NIT debe ser un número de hasta 10 dígitos' }));
                } else {
                    setErrors((prev) => ({ ...prev, nit: '' }));
                }
                break;

            case 'name':
                if (!/^[a-zA-Z\s]{1,30}$/.test(value)) {
                    setErrors((prev) => ({ ...prev, name: 'Nombre debe ser solo letras y hasta 30 caracteres' }));
                } else {
                    setErrors((prev) => ({ ...prev, name: '' }));
                }
                break;

            case 'email':
                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                    setErrors((prev) => ({ ...prev, email: 'Formato de correo electrónico inválido' }));
                } else {
                    setErrors((prev) => ({ ...prev, email: '' }));
                }
                break;

            default:
                break;
        }

        onChange({ ...client, [name]: value });
    };

    const handleContactChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedContacts = [...localContacts];
        updatedContacts[index] = { ...updatedContacts[index], [name]: value };
        setLocalContacts(updatedContacts);
        onContactsChange(updatedContacts);  // Asegura que el cambio se comunique al componente superior

        const updatedErrors = [...contactErrors];
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!/^[a-zA-Z\s]{1,30}$/.test(value)) {
                    updatedErrors[index] = { ...updatedErrors[index], [name]: 'Debe ser solo letras y hasta 30 caracteres' };
                } else {
                    updatedErrors[index] = { ...updatedErrors[index], [name]: '' };
                }
                break;
            case 'email':
                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                    updatedErrors[index] = { ...updatedErrors[index], email: 'Formato de correo electrónico inválido' };
                } else {
                    updatedErrors[index] = { ...updatedErrors[index], email: '' };
                }
                break;
            default:
                break;
        }
        setContactErrors(updatedErrors);
    };

    const addContact = () => {
        const newContact = { firstName: '', lastName: '', phone: '', email: '' };
        setLocalContacts([...localContacts, newContact]);
        setContactErrors([...contactErrors, { firstName: '', lastName: '', phone: '', email: '' }]);
    };

    const removeContact = (index: number) => {
        const updatedContacts = [...localContacts];
        updatedContacts.splice(index, 1);
        setLocalContacts(updatedContacts);
        onContactsChange(updatedContacts);

        const updatedErrors = [...contactErrors];
        updatedErrors.splice(index, 1);
        setContactErrors(updatedErrors);
    };

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="NIT" name="nit" type="text" value={client.nit} onChange={handleInputChange} error={Boolean(errors.nit)} helperText={errors.nit} fullWidth required />
            <TextField label="Name" name="name" type="text" value={client.name} onChange={handleInputChange} error={Boolean(errors.name)} helperText={errors.name} fullWidth required />
            <TextField label="Address" name="address" type="text" value={client.address} onChange={handleInputChange} fullWidth required />
            <TextField label="City" name="city" type="text" value={client.city} onChange={handleInputChange} fullWidth required />
            <TextField label="Country" name="country" type="text" value={client.country} onChange={handleInputChange} fullWidth required />
            <TextField label="Phone" name="phone" type="text" value={client.phone} onChange={handleInputChange} error={Boolean(errors.phone)} helperText={errors.phone} fullWidth />
            <TextField label="Email" name="email" type="email" value={client.email} onChange={handleInputChange} error={Boolean(errors.email)} helperText={errors.email} fullWidth required />

            {localContacts.map((contact, index) => (
                <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', opacity: 0.6 }}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={contact.firstName}
                        onChange={(e) => handleContactChange(index, e)}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={contact.lastName}
                        onChange={(e) => handleContactChange(index, e)}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, e)}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={contact.email}
                        onChange={(e) => handleContactChange(index, e)}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                    <Button color="secondary" onClick={() => removeContact(index)}>Remove Contact</Button>
                </Box>
            ))}
            <Button color="primary" onClick={addContact}>Add Contact</Button>
        </Box>
    );
};

export default UpdateClientForm;