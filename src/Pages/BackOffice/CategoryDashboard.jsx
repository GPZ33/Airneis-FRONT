import React, { useState, useEffect, useMemo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import DataTable from '../../Components/DataTable/DataTable';
import { categoryApiService } from '../../service/categoryApiService';
import { productApiService } from '../../service/productApiService'; 
import CreationDialogsContainer from '../../Components/BackofficeDialogs/CreationDialogsContainer';
import EditCategoryDialog from '../../Components/BackofficeDialogs/EditCategoryDialog';

const CategoryDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [editingCategory, setEditingCategory] = useState(null); 
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await categoryApiService.getCategories();
        if (isMounted) {
          setData(response['hydra:member']); // Mise à jour de 'data' au lieu de 'categories'
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (isMounted) {
          setError('Error fetching categories');
          setLoading(false);
        }
      }
    };

    const fetchProducts = async () => {
      try {
        const products = await productApiService.getAllProducts();
        if (isMounted) {
          if (products && products.length > 0) {
            setProducts(products);
          } else {
            setError('No data in response');
          }
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching products:', error);
          setError('Error fetching products');
          setLoading(false);
        }
      }
    };
    
    fetchCategories();
    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditClick = (category) => {
    setEditingCategory(category);
  };

  const handleEditChange = (field, value) => {
    setEditingCategory(prevCategory => ({
        ...prevCategory,
        [field]: value
    }));
  };
  
  const handleSaveEdit = () => {
    const CategoryToUpdate = {
        ...editingCategory,
        products: editingCategory.products.map(p => p['@id']),
    };
    categoryApiService.putCategory(CategoryToUpdate)
      .then((updatedCategory) => {
        setData(prevData => prevData.map(category => category.id === updatedCategory.id ? updatedCategory : category));
        setEditingCategory(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleDelete = (category) => {
    categoryApiService.deleteCategory(category)
      .then(() => {
        setData(prevData => prevData.filter(c => c.id !== category.id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Product', accessor: row => row.products.map(product => product.name).join(', ') }, 
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <Button onClick={() => handleEditClick(row.original)}>Edit</Button>
            <Button onClick={() => handleDelete(row.original)}>Delete</Button>
          </div>
        ),
      },
    ],
    []
  );

  const handleCheckboxChange = (event, category) => {
    if (event.target.checked) {
      setSelectedCategories(prevSelected => [...prevSelected, category]);
    } else {
      setSelectedCategories(prevSelected => prevSelected.filter(c => c.id !== category.id));
    }
  };

  const isSelected = (category) => selectedCategories.some(c => c.id === category.id);

  const onDeleteSelected = (selectedCategories) => {
    selectedCategories.forEach(category => {
        handleDelete(category);
      });
      setSelectedCategories([]);
  };

  if (loading) {
    return <div><CircularProgress /></div>; // Afficher un indicateur de chargement si nécessaire
  }

  if (error) {
    return <div>{error}</div>; // Gérer les erreurs
  }

  return (
    <>
      <h1>Category Dashboard</h1>
      <Button component={Link} to="/backoffice/category_creation" variant="contained" color="primary">Create Category</Button>
      <CreationDialogsContainer /> {/* Container de dialogues pour la création */}
      <DataTable
        columns={columns}
        data={data} // Utilisation de 'data' au lieu de 'categories'
        onDeleteSelected={onDeleteSelected}
        onCheckboxChange={handleCheckboxChange}
        isSelected={isSelected}
      />
      <EditCategoryDialog
        open={!!editingCategory}
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        onChange={handleEditChange}
        onSave={handleSaveEdit}
        allProducts={products}
        />
    </>
  );
};

export default CategoryDashboard;
