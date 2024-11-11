// pages/OpportunitiesPage.tsx
import React, { useState } from "react";
import OpportunitiesTable from "../components/ListOpportunities";
import CreateOpportunityModal from "../components/CreateOpportunityModal";
import { Button } from '@mui/material';
import { IOpportunity } from "../types/ListOpportunity.type";

const OpportunitiesPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleOpportunityCreated = (newOpportunity: IOpportunity) => {
        console.log('Oportunidad creada:', newOpportunity);
    };

    return (
        <div>
            <h1 className="text-center md:text-6xl text-4xl font-extrabold mb-10 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black-500 to-gray-600 ">
                OPPORTUNITIES LIST
            </h1>
            <div className="flex justify-start mb-4">
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    New Opportunity
                </Button>
            </div>
            <OpportunitiesTable />

            <CreateOpportunityModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleOpportunityCreated}
            />
        </div>
    );
};

export default OpportunitiesPage;
