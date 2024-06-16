const ImageCard = ({ urls, description, onImageClick }) => {
  return (
    <li>
      <img
        src={urls.small}
        alt={description}
        onClick={() => onImageClick(urls.regular)}
      />
    </li>
  );
};

export default ImageCard;
