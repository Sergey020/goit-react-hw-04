/* eslint-disable no-irregular-whitespace */
const ImageCard = ({ urls, description }) => {
  return (
    <li>
      <img src={urls.small} alt={description} />
    </li>
  );
};

export default ImageCard;
