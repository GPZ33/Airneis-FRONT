import ProduitApercu from '../Components/ProduitApercu';
import Footer from './Components/Footer';
import Header from './Components/Header';

const Categorie = () => {
  return (
    <>
      <Header />
      <>
          <div className="categorie">
              <img alt="categorie_name"/>
              <h1>Category Name</h1>
          </div>
          <h2>Description de la categorie</h2>
      </>
      <ProduitApercu />
      <Footer />
    </>
  );
}

export default Categorie;