import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { productApiService } from "../../service/productApiService";
import { categoryApiService } from "../../service/categoryApiService";
import { materialApiService } from "../../service/materialApiService";
import { imageApiService } from "../../service/imageApiService";
import CreationDialogsContainer from "../../Components/BackofficeDialogs/CreationDialogsContainer";

const ProductCreation = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [stock, setStock] = useState(false);
  const [highlander, setHighlander] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materials = await materialApiService.getAllMaterials();
        setMaterials(materials);
        setFilteredMaterials(materials);
        console.log("materials", materials);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await categoryApiService.getCategories();
        setCategories(response["hydra:member"]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchImages = async () => {
      try {
        const images = await imageApiService.getAllImages();
        setImages(images);
        setFilteredImages(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchMaterials();
    fetchCategories();
    fetchImages();
    setLoading(false);
  }, []);

  const handleMaterialSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filtered =
      searchText === ""
        ? materials
        : materials.filter((material) =>
            material.name.toLowerCase().includes(searchText)
          );
    setFilteredMaterials(filtered);
  };

  const handleImageSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filtered = images.filter((image) =>
      image.contentUrl.toLowerCase().includes(searchText)
    );
    setFilteredImages(filtered);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setDetails("");
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedImages([]);
    setStock(false);
    setHighlander(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      price: parseFloat(price),
      description,
      details,
      category: selectedCategories.map((cat) => cat["@id"]),
      materials: selectedMaterials.map((material) => material["@id"]),
      images: selectedImages.map((image) => image["@id"]),
      stock,
      highlander,
    };

    if (isNaN(newProduct.price)) {
      setError("The price must be a valid number");
      return;
    }

    try {
      await productApiService.createProduct(newProduct, token);
      alert("Product created successfully");
      resetForm(); // Reset form after successful creation
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Error creating product");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer un Produit</h1>
      <CreationDialogsContainer />
      {error && <div>{error}</div>}
      <TextField
        label="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Catégories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
          input={<OutlinedInput label="Categories" />}
        >
          {categories.map((cat) => (
            <MenuItem key={cat["@id"]} value={cat}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Matériaux</InputLabel>
        <Select
          multiple
          value={selectedMaterials}
          onChange={(e) => setSelectedMaterials(e.target.value)}
          input={<OutlinedInput label="Materials" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          <TextField
            label="Search"
            onChange={handleMaterialSearch}
            fullWidth
            margin="normal"
          />
          {filteredMaterials.map((material) => (
            <MenuItem key={material["@id"]} value={material}>
              {material.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Images</InputLabel>
        <Select
          multiple
          value={selectedImages}
          onChange={(e) => setSelectedImages(e.target.value)}
          input={<OutlinedInput label="Images" />}
          style={{ maxHeight: 200, overflowY: "auto" }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          <TextField
            label="Search"
            onChange={handleImageSearch}
            fullWidth
            margin="normal"
          />
          {filteredImages.map((image) => (
            <MenuItem key={image["@id"]} value={image}>
              {image.contentUrl}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={stock}
            onChange={(e) => setStock(e.target.checked)}
          />
        }
        label="Stock"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={highlander}
            onChange={(e) => setHighlander(e.target.checked)}
          />
        }
        label="Highlander"
      />
      <Button type="submit" variant="contained" color="primary">
        Créer
      </Button>
    </form>
  );
};

export default ProductCreation;
