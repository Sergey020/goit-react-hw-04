import Modal from "react-modal";
Modal.setAppElement("#root");

const ImageModal = ({
  isModalOpen,
  closeModal,
  largeImageURL,
  customStyles,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div>
        <img src={largeImageURL} alt="" />
      </div>
    </Modal>
  );
};

export default ImageModal;
