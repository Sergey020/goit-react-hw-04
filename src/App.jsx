
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getPhotos } from "./apiServise/photos";
import { Toaster } from "react-hot-toast";
import Loaeder from "./components/Loaeder/Loaeder";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

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
        const { results, total_pages } = await getPhotos(
          query,
          page
        );
        if(!results.length) {return setEmpty(true)} 
        setImages(prevImages => [...prevImages, ...results])
        setIsVisible (page < total_pages)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoding(false);
      }
    };
    getImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery) => {
    setImages([])
    setPage(1)
    // console.log(searchQuery);
    setQuery(searchQuery);
  };
console.log(isVisible);
const loadMore = () => {
  setPage(prevPage => prevPage +1)
}
  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      <Toaster/>
      {images.length > 0 && <ImageGallery images={images}/>}
      {!images.length && !empty && <p>Let`s begin search 🔎</p>}
      {isLoding && <Loaeder />}
      {error && <ErrorMessage/>}
      {empty && <p>Sorry. There are no images ... 😭</p>}
      {images.length > 0 && !isLoding && isVisible && <LoadMoreBtn onClick={loadMore} />}
    </>
  );
}

export default App;
