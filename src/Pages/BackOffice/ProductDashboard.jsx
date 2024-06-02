import React, { useState, useEffect, useMemo } from 'react';
import { Button, CircularProgress, Checkbox } from '@mui/material';
import DataTable from '../../Components/DataTable/DataTable';
import EditProductDialog from '../../Components/ProductDialog/EditProductDialog';
import { productApiService } from '../../service/productApiService';
import { categoryApiService } from '../../service/categoryApiService';
import { materialApiService } from '../../service/materialApiService';
import { imageApiService } from '../../service/imageApiService';

const ProductDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await productApiService.getProducts(currentPage);
        if (isMounted) {
          if (response && response['hydra:member']) {
            setData(response['hydra:member']);
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

    const fetchMaterials = async () => {
      try {
        const response = await materialApiService.getMaterials();
        setMaterials(response['hydra:member']);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await categoryApiService.getCategories();
        setCategories(response['hydra:member']);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await imageApiService.getImages();
        setImages(response['hydra:member']);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchProducts();
    fetchMaterials();
    fetchCategories();
    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleEditChange = (field, value) => {
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  const handleSaveEdit = () => {
    const productToUpdate = {
      ...editingProduct,
      category: editingProduct.category.map(c => c['@id']),
      materials: editingProduct.materials.map(m => m['@id']),
      images: editingProduct.images.map(i => i['@id']),
      stock: editingProduct.stock,
      highlander: editingProduct.highlander
    };

    productApiService.putProduct(productToUpdate)
      .then((updatedProduct) => {
        setData(prevData => prevData.map(product => product.id === updatedProduct.id ? updatedProduct : product));
        setEditingProduct(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Details', accessor: 'details' },
      { Header: 'Category', accessor: row => row.category.length > 0 ? row.category[0].name : '' },
      { Header: 'Materials', accessor: row => row.materials.map(material => material.name).join(', ') },
      {
        Header: 'Stock',
        accessor: 'stock',
        Cell: ({ row }) => (<Checkbox checked={row.original.stock} disabled/>),
      },
      {
        Header: 'HighLander',
        accessor: 'highlander',
        Cell: ({ row }) => (<Checkbox checked={row.original.highlander} disabled/>),
      },
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

  const handleDelete = (product) => {
    productApiService.deleteProduct(product)
      .then(() => {
        setData(prevData => prevData.filter(p => p.id !== product.id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (event, product) => {
    if (event.target.checked) {
      setSelectedProducts(prevSelected => [...prevSelected, product]);
    } else {
      setSelectedProducts(prevSelected => prevSelected.filter(p => p.id !== product.id));
    }
  };

  const isSelected = (product) => selectedProducts.some(p => p.id === product.id);

  const onDeleteSelected = (selectedProducts) => {
    selectedProducts.forEach(product => {
      handleDelete(product);
    });
    setSelectedProducts([]);
  };

  if (loading) {
    return <div><CircularProgress /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Product Dashboard</h1>
      <DataTable
        columns={columns}
        data={data}
        onCheckboxChange={handleCheckboxChange}
        isSelected={isSelected}
        onDeleteSelected={onDeleteSelected}
      />
      <Button onClick={() => handlePageChange(currentPage - 1)}>Previous Page</Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>Next Page</Button>

      <EditProductDialog
        open={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEdit}
        onChange={handleEditChange}
        allMaterials={materials}
        allCategories={categories}
        allImages={images}
        putProduct={productApiService.putProduct}
      />
    </>
  );
};

export default ProductDashboard;


