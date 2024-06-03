import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, Chip, FormControlLabel, Checkbox } from '@mui/material';

const EditCategoryDialog = ({ category, open, onClose, onSave, onChange, allProducts }) => {
  if (!category) return null;

  const handleProductAdd = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    if (product && !category.products.some(p => p.id === productId)) {
      onChange('products', [...category.products, product]);
    }
  };

  const handleProductRemove = (productId) => {
    onChange('products', category.products.filter(p => p.id !== productId));
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={category.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={category.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          fullWidth
        />
        <div>
          <h4>Products</h4>
          {category.products.map((product) => (
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

export default EditCategoryDialog;
