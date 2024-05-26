import CarouselSlides from "../Components/Carrousel/Carousel";
import CategoriesInfo from "../Components/CategoriesInfo/CategoriesInfo";
import Highlanders from "../Components/Highlandres/Highlanders";
import livingroom from "../Components/Assets/living_room_furniture.jpg";
import bedroom from "../Components/Assets/bedroom_furniture.jpg";
import kids from "../Components/Assets/kids_furniture.jpg";

const Home = () => {
    const carousel = [livingroom, bedroom, kids];
  return (
    <>
        <CarouselSlides props={carousel}/>
        <CategoriesInfo/>
        {/*<Highlanders/>*/}
    </>
  );
}

export default Home;
