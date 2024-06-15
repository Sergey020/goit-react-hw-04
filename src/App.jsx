import { Toaster } from "react-hot-toast";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getPhotos } from "./apiServise/photos";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setIsLoding(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if(!photos.length) {return setEmpty(true)} 
        setImages(prevImages => [...prevImages, ...photos])
        setIsVisible (page < Math.ceil(total_results/per_page))
      } catch (error) {
        setError(error);
      } finally {
        setIsLoding(false);
      }
    };
    getImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery) => {
    // console.log(searchQuery);
    setQuery(searchQuery);
  };
console.log(isVisible);
  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      <Toaster />
    </>
  );
}

export default App;
