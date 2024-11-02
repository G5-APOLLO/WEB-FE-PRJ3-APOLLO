import { useState } from "react";
import { useGetClients } from "./useGetClients";

export const useToggleActive = (updateClientState: (id: number, state: boolean) => void) => {
    const { data: clients } = useGetClients();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const toggleActive = async (id: number, state: boolean) => {
        const client = clients?.find((client) => client.id === id);

        if (client) {
            try {
                setLoading(true);
                const response = await fetch(`https://web-fe-prj3-api-apollo.onrender.com/clients/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ active: state }),
                });

                if (!response.ok) {
                    throw new Error('Error updating client');
                }

                const updatedClient = await response.json();
                console.log('Client updated successfully:', updatedClient);
                updateClientState(id, state); // Actualiza el estado local
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Client not found');
            console.error('Client not found');
        }
    };

    return { toggleActive, error, loading };
};