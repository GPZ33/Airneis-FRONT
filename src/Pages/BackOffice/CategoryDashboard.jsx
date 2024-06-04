import React, { useState, useEffect, useMemo } from 'react';
import { Button, CircularProgress } from '@mui/material';
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
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await categoryApiService.getCategories();
        if (isMounted) {
          setData(response['hydra:member']);
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
    categoryApiService.putCategory(CategoryToUpdate, token)
      .then((updatedCategory) => {
        setData(prevData => prevData.map(category => category.id === updatedCategory.id ? updatedCategory : category));
        setEditingCategory(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleDelete = (category) => {
    categoryApiService.deleteCategory(category, token)
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
      { Header: 'Nom', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Produits', accessor: row => row.products.map(product => product.name).join(', ') }, 
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <Button onClick={() => handleEditClick(row.original)}>Modifier</Button>
            <Button onClick={() => handleDelete(row.original)}>Supprimer</Button>
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
    return <div><CircularProgress /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Dashboard des catégories</h1>
      <CreationDialogsContainer />
      <DataTable
        columns={columns}
        data={data}
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
