import CarouselSlides from "../Components/Carrousel/Carousel";
import CategoriesInfo from "../Components/CategoriesInfo/CategoriesInfo";
import Highlanders from "../Components/Highlandres/Highlanders";
import livingroom from "../Components/Assets/living_room_furniture.jpg";
import bedroom from "../Components/Assets/bedroom_furniture.jpg";
import kids from "../Components/Assets/kids_furniture.jpg";
import {useEffect, useState} from "react";

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);

    const apiUrl = "http://127.0.0.1:8000";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl + "/api/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data["hydra:member"]);
            } catch (error) {
                console.error("Error fetching categories:", error.message);
            }
        };

        fetchData();
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

    // useEffect(() => {
    //     const fetchImageData = async () => {
    //         try {
    //             const imageDataArray = [];
    //                 const promises = categories.map(async (item) => {
    //                     const url = apiUrl + item.image['@id'];
    //                     const response = await fetch(url);
    //                     if (!response.ok) {
    //                         throw new Error(`Failed to fetch image data for ${item.name}`);
    //                     }
    //                     const imageData = await response.json();
    //                     if (imageData.carrousel) {
    //                         imageDataArray.push(imageData);
    //                     }
    //                 });
    //                 await Promise.all(promises);
    //             setImageData(imageDataArray);
    //         } catch (error) {
    //             console.error('Error fetching image data:', error);
    //         }
    //     };
    //
    //     if (categories) {
    //         fetchImageData();
    //     }
    // }, [categories, apiUrl]);

    // useEffect(() => {
    //     const fetchImage = async () => {
    //         try {
    //             imageData.map(async image => {
    //                 const response = await fetch(`http://127.0.0.1:8000/${image['@id']}`)
    //                 const imageData = await response.json();
    //                 setImage(imageData);
    //                 console.log(imageData);
    //             })
    //         } catch (error) {
    //             console.error('Error fetching image details:', error.message);
    //         }
    //
    //     }
    //     fetchImage();
    // }, [imageData]);

    return (
    <>
        <CarouselSlides props={images.map(image => image.contentUrl)}/>
        <CategoriesInfo/>
        {/*<Highlanders/>*/}
    </>
  );
}

export default Home;
