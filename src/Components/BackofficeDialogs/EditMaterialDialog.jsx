import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, Chip } from '@mui/material';

const EditMaterialDialog = ({ material, open, onClose, onSave, onChange, allProducts }) => {
  if (!material) return null;

  const handleProductAdd = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    if (product && !material.products.some(p => p.id === productId)) {
      onChange('products', [...material.products, product]);
    }
  };

  const handleProductRemove = (productId) => {
    onChange('products', material.products.filter(p => p.id !== productId));
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Material</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={material.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          fullWidth
        />
        <div>
          <h4>Products</h4>
          {material.products.map((product) => (
            <Chip
              key={product.id}
              label={product.name}
              onDelete={() => handleProductRemove(product.id)}
              style={{ marginRight: '5px', marginBottom: '5px' }}
            />
          ))}
          <Select
            value=""
            onChange={(e) => handleProductAdd(e.target.value)}
            fullWidth
            displayEmpty
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {allProducts.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMaterialDialog;
