
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getPhotos } from "./apiServise/photos";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loaeder/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
console.log(empty,setPage);
  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setIsLoding(true);
      try {
        const { results, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if(!results.length) {return setEmpty(true)} 
        setImages(prevImages => [...prevImages, ...results])
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
      <Toaster/>
      {images.length > 0 && <ImageGallery images={images}/>}
      {/* {!images.length && !empty} */}
      {isLoding && <Loader />}
      {error && <ErrorMessage/>}
      {/* {empty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>} */}
    </>
  );
}

export default App;
