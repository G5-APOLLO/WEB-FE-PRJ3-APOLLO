import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import OpportunityForm from './UpdateOportunityForm';
import Spinner from "./Spinner";
import ErrorComponent from './Error-component';
import { fetchOpportunityById, updateOpportunity } from '../services/oportunity.service';
import { IOpportunity } from '../types/ListOpportunity.type';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type UpdateOpportunityModalProps = {
  open: boolean;
  onClose: () => void;
  opportunityId?: number;
  onOpportunityUpdated: (opportunity: IOpportunity) => void;
};

const UpdateOpportunityModal: React.FC<UpdateOpportunityModalProps> = ({ open, onClose, opportunityId, onOpportunityUpdated }) => {
  const [opportunity, setOpportunity] = useState<IOpportunity | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunityData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (opportunityId !== undefined) {
          const opportunityData: IOpportunity = await fetchOpportunityById(opportunityId);
          setOpportunity(opportunityData);
        } else {
          throw new Error('Opportunity ID is undefined');
        }
      } catch (error) {
        setError('Error loading opportunity data'); 
      } finally {
        setLoading(false);
      }
    };

    if (open && opportunityId) {
      fetchOpportunityData();
    }
  }, [opportunityId, open]);

  useEffect(() => {
    const validateForm = () => {
      const validStatuses = ["Open", "In Study", "Purchase Order", "Finalized"];
      return opportunity !== null && opportunity.businessName !== '' && opportunity.businessLine && opportunity.description !== '' && opportunity.estimatedValue > 0 && opportunity.estimatedDate !== '' && validStatuses.includes(opportunity.status);
    };
    setIsFormValid(validateForm());
  }, [opportunity]);

  const handleOpportunityChange = (updatedOpportunity: IOpportunity) => {
    setOpportunity(updatedOpportunity);
  };

  const handleUpdateOpportunity = async () => {
    if (!isFormValid) {
      alert('Please complete all required fields');
      return;
    }

    try {
      if (opportunity) {
        const updatedOpportunity = await updateOpportunity(opportunity);
        toast.success('Opportunity updated successfully');
        onOpportunityUpdated(updatedOpportunity);
        onClose();
      }
    } catch (error) {
      setError('Error updating opportunity');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle className="text-center text-2xl font-bold">Update Opportunity</DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorComponent message={error} />
          ) : opportunity ? (
            <OpportunityForm opportunity={opportunity} onChange={handleOpportunityChange} />
          ) : (
            <p>Error: Opportunity not found</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateOpportunity} color="primary" variant="contained" disabled={!isFormValid}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default UpdateOpportunityModal;