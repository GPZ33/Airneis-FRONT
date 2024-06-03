import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress } from '@mui/material';
import { imageApiService } from '../../service/imageApiService';

const CreateImageDialog = ({ open, handleClose }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contentUrl, setContentUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    setError(null);

    try {
        console.log("formData", formData);
      const data = await imageApiService.createImage(formData);
      setContentUrl(data.contentUrl);
      alert('Image uploaded successfully');
      setFile(null); // Reset file input
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Error uploading image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit} id="upload-form">
          <TextField type="file" onChange={handleFileChange} fullWidth margin="normal" />
          {contentUrl && (
            <div>
              <p>Image uploaded successfully:</p>
              <img src={contentUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button type="submit" form="upload-form" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateImageDialog;
