import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import { categoryApiService } from '../../service/categoryApiService';

const CreateCategoryDialog = ({ open, handleClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

  const handleCreateCategory = async () => {
    if (!name.trim()) {
      setError('Please enter a name for the category');
      return;
    }
    setIsLoading(true);
    try {
      await categoryApiService.createCategory({ name, description });
      alert('Category created successfully');
      setName('');
      setDescription('');
      handleClose();
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Error creating category');
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
            <Button onClick={handleClose} color="primary">
                Annuler
            </Button>
            <Button onClick={handleCreateCategory} variant="contained" color="primary" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Créer'}
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default CreateCategoryDialog;
