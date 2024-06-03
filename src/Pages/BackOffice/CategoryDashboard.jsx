import React, { useState, useEffect, useMemo } from 'react';
import { Button, CircularProgress, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import DataTable from '../../Components/DataTable/DataTable';
import { categoryApiService } from '../../service/categoryApiService'; 
import CreationDialogsContainer from '../../Components/BackofficeDialogs/CreationDialogsContainer';
import { productApiService } from '../../service/productApiService'; 
import EditCategoryDialog from '../../Components/BackofficeDialogs/EditCategoryDialog';

const CategoryDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [editingCategory, setEditingCategory] = useState(null); 
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await categoryApiService.getCategories(); // Récupérer les catégories depuis le service
        if (isMounted) {
          setCategories(response['hydra:member']); // Mettre à jour les catégories dans le state
          setLoading(false); // Terminer le chargement
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (isMounted) {
          setError('Error fetching categories'); // Gérer les erreurs
          setLoading(false); // Terminer le chargement en cas d'erreur
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
      [field]: Array.isArray(value) ? value : [value]
    }));
  };
  

  const handleSaveEdit = () => {
    const CategoryToUpdate = {
        ...editingCategory,
        products: editingCategory.products.map(p => p['@id']),
        //images: editingProduct.images.map(i => i['@id']),
      };
      console.log(CategoryToUpdate)
      categoryApiService.putCategory(CategoryToUpdate)
      .then((updatedCategory) => {
        setCategories(prevData => prevData.map(category => category.id === updatedCategory.id ? updatedCategory : category));
        setEditingCategory(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleDelete = (category) => {
    categoryApiService.deleteCategory(category)
      .then(() => {
        setCategories(prevData => prevData.filter(c => c.id !== category.id));
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
    // Gérer la sélection des catégories
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
        data={categories}
        onDeleteSelected={onDeleteSelected}
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
