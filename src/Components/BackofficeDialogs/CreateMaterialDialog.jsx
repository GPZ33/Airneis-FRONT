import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import { materialApiService } from '../../service/materialApiService';

const CreateMaterialDialog = ({ open, handleClose }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateMaterial = async () => {
        if (!name.trim()) {
            setError('Please enter a name for the material');
            return;
        }

        setIsLoading(true);

        try {
            await materialApiService.createMaterial({ name });
            alert('Material created successfully');
            setName('');
            handleClose();
        } catch (error) {
            console.error('Error creating material:', error);
            setError('Error creating material');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Material</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!error}
                    helperText={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreateMaterial} variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateMaterialDialog;