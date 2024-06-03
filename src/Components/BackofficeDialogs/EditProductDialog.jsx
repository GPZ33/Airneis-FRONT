import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, Chip, Checkbox, FormControlLabel } from '@mui/material';

const EditProductDialog = ({ product, open, onClose, onSave, onChange, allMaterials, allCategories, allImages }) => {
  if (!product) return null;

  const handleMaterialAdd = (materialId) => {
    const material = allMaterials.find(m => m.id === materialId);
    if (material && !product.materials.some(m => m.id === materialId)) {
      onChange('materials', [...product.materials, material]);
    }
  };

  const handleMaterialRemove = (materialId) => {
    onChange('materials', product.materials.filter(m => m.id !== materialId));
  };

  const handleCategoryAdd = (categoryId) => {
    const category = allCategories.find(c => c.id === categoryId);
    if (category && !product.category.some(cat => cat.id === categoryId)) {
      onChange('category', [...product.category, category]);
    }
  };
  
  const handleCategoryRemove = (categoryId) => {
    onChange('category', product.category.filter(cat => cat.id !== categoryId));
  };

  const handleImageChange = (imageId) => {
    const image = allImages.find(i => i.id === imageId);
    if (image && !product.images.some(img => img.id === imageId)) {
      onChange('images', [...product.images, image]);
    }
  };

  const handleImageRemove = (imageId) => {
    onChange('images', product.images.filter(image => image.id !== imageId));
  };

  const handleHighlanderChange = (event) => {
    onChange('highlander', event.target.checked);
  };

  const handleStockChange = (event) => {
    onChange('stock', event.target.checked);
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modification Produit</DialogTitle>
      <DialogContent>
        <TextField
          label="Nom"
          value={product.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          fullWidth
        />
        <TextField
          label="Prix"
          type="number"
          value={product.price || ''}
          onChange={(e) => {
            const price = parseFloat(e.target.value);
            onChange('price', isNaN(price) ? '' : price);
          }}
          fullWidth
        />
        <TextField
          label="Description"
          value={product.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          fullWidth
        />
        <TextField
          label="Details"
          value={product.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          fullWidth
        />
        <div>
        <h4>Catégories</h4>
        {product.category.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            onDelete={() => handleCategoryRemove(category.id)}
            style={{ marginRight: '5px', marginBottom: '5px' }}
          />
        ))}
        <Select
          value=""
          onChange={(e) => handleCategoryAdd(e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value=""><em>Vide</em></MenuItem>
          {allCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </div>
        <div>
          <h4>Matériaux</h4>
          {product.materials.map((material) => (
            <Chip
              key={material.id}
              label={material.name}
              onDelete={() => handleMaterialRemove(material.id)}
              style={{ marginRight: '5px', marginBottom: '5px' }}
            />
          ))}
          <Select
            value=""
            onChange={(e) => handleMaterialAdd(e.target.value)}
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
            <MenuItem value=""><em>Vide</em></MenuItem>
            {allMaterials.map((material) => (
              <MenuItem key={material.id} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <h4>Images</h4>
          {product.images.map((image) => (
            <Chip
              key={image.id}
              label={image.contentUrl}
              onDelete={() => handleImageRemove(image.id)}
              style={{ marginRight: '5px', marginBottom: '5px' }}
            />
          ))}
          <Select
            value=""
            onChange={(e) => handleImageChange(e.target.value)}
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
            <MenuItem value=""><em>Vide</em></MenuItem>
            {allImages.map((image) => (
              <MenuItem key={image.id} value={image.id}>
                {image.contentUrl}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox checked={product.highlander} onChange={handleHighlanderChange} />}
            label="Highlander"
          />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox checked={product.stock} onChange={handleStockChange} />}
            label="Stock"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSave} color="primary">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
