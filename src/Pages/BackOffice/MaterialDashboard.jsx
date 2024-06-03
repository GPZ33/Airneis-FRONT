import React, { useState, useEffect, useMemo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import DataTable from '../../Components/DataTable/DataTable';
import { materialApiService } from '../../service/materialApiService';
import { productApiService } from '../../service/productApiService';
import CreationDialogsContainer from '../../Components/BackofficeDialogs/CreationDialogsContainer';
import EditMaterialDialog from '../../Components/BackofficeDialogs/EditMaterialDialog';

const MaterialDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [editingMaterial, setEditingMaterial] = useState(null); 
  const [selectedMaterials, setSelectedMaterials] = useState([]); 
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    let isMounted = true;

    const fetchMaterials = async () => {
      try {
        const materials = await materialApiService.getAllMaterials();
        if (isMounted) {
          setData(materials);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching materials:', error);
        if (isMounted) {
          setError('Error fetching materials');
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
    
    fetchMaterials();
    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditClick = (material) => {
    setEditingMaterial(material);
  };

  const handleEditChange = (field, value) => {
    setEditingMaterial(prevMaterial => ({
      ...prevMaterial,
      [field]: value
    }));
  };
  
  const handleSaveEdit = () => {
    const MaterialToUpdate = {
        ...editingMaterial,
        products: editingMaterial.products.map(p => p['@id']),
    };
    materialApiService.putMaterial(MaterialToUpdate)
      .then((updatedMaterial) => {
        setData(prevData => prevData.map(material => material.id === updatedMaterial.id ? updatedMaterial : material));
        setEditingMaterial(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      }); 
  };

  const handleDelete = (material) => {
    materialApiService.deleteMaterial(material)
      .then(() => {
        setData(prevData => prevData.filter(m => m.id !== material.id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Products', accessor: row => row.products.map(product => product.name).join(', ') },
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

  const handleCheckboxChange = (event, material) => {
    if (event.target.checked) {
        setSelectedMaterials(prevSelected => [...prevSelected, material]);
      } else {
        setSelectedMaterials(prevSelected => prevSelected.filter(m => m.id !== material.id));
      }
  };

  const isSelected = (material) => selectedMaterials.some(m => m.id === material.id);

  const onDeleteSelected = (selectedMaterials) => {
    selectedMaterials.forEach(material => {
        handleDelete(material);
      });
      setSelectedMaterials([]);
  };

  if (loading) {
    return <div><CircularProgress /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Material Dashboard</h1>
      <CreationDialogsContainer />
      <DataTable
        columns={columns}
        data={data}
        onDeleteSelected={onDeleteSelected}
        onCheckboxChange={handleCheckboxChange}
        isSelected={isSelected}
      />
      <EditMaterialDialog
        open={!!editingMaterial}
        material={editingMaterial}
        onClose={() => setEditingMaterial(null)}
        onChange={handleEditChange}
        onSave={handleSaveEdit}
        allProducts={products}
      />
    </>
  );
};

export default MaterialDashboard;
