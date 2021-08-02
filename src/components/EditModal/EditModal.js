
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: 500,
        width: '80%',
        height: '60%',
        transform: 'translate(-50%, -50%)',
    },
};

const EditModal = ({ setOpenModal, openModal, children }) => {

    function closeModal() {
        setOpenModal(false);
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={openModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {children}
        </Modal>
    )
}

export default EditModal
