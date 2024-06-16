import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getPhotos } from "./apiServise/photos";
import { Toaster } from "react-hot-toast";
import Loaeder from "./components/Loaeder/Loaeder";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "70%",
    maxHeight: "70%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setIsLoding(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (!results.length) {
          return setEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoding(false);
      }
    };
    getImages();
  }, [query, page]);

  const onHandleSubmit = (searchQuery) => {
    setImages([]);
    setPage(1);
    // console.log(searchQuery);
    setQuery(searchQuery);
  };
  console.log(isVisible);
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImageURL(null);
  };

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      <Toaster />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {!images.length && !empty && <p>Let`s begin search 🔎</p>}
      {isLoding && <Loaeder />}
      {error && <ErrorMessage />}
      {empty && <p>Sorry. There are no images ... 😭</p>}
      {images.length > 0 && !isLoding && isVisible && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {isModalOpen && (
        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          largeImageURL={largeImageURL}
          customStyles={customStyles}
        />
      )}
    </>
  );
}

export default App;
