import CarouselSlides from "../Components/Carrousel/Carousel";
import CategoriesInfo from "../Components/CategoriesInfo/CategoriesInfo";
import Highlanders from "../Components/Highlandres/Highlanders";
import {useEffect, useState} from "react";
import {categoryApiService} from "../service/categoryApiService";

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);


    useEffect(() => {
        categoryApiService.getCategories().then(result => {
            const categories = result["hydra:member"];
            setCategories(categories);
        })
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imageDataArray = [];
                for (const category of categories) {
                    const url = `http://127.0.0.1:8000${category.image['@id']}`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Failed to fetch image details');
                    }
                    const imageData = await response.json();
                    imageDataArray.push(imageData);
                }
                    setImages(imageDataArray);
            } catch (error) {
                console.error('Error fetching image details:', error.message);
            }
        };

        if (categories) {
            fetchImages();
        }

    }, [categories]);


    return (
    <>
        <CarouselSlides props={images.map(image => image.contentUrl)}/>
        <CategoriesInfo categories={categories}/>
        <Highlanders/>
    </>
  );
}

export default Home;
