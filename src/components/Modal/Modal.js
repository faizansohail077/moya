import React from 'react'
import './Modal.css'
import Modal from 'react-modal';
import { ImCross } from 'react-icons/im'
import { Input, Button } from '../../components'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: 500,
        width: '80%',
        height: '50%',
        transform: 'translate(-50%, -50%)',
    },
};

const customStyles2 = {
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

const ModalComponent = ({
    value1, onChangeValue1,
    value2, onChangeValue2,
    value3, onChangeValue3,
    value4, onChangeValue4,
    value5, onChangeValue5,
    title, setOpenModal,
    openModal,
    input,
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4,
    placeholder5,
    onClick,
    loading,
    error,
    errorMessage,
    type
}) => {
    function closeModal() {
        setOpenModal(false);
    }

    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={openModal}
                onRequestClose={closeModal}
                style={input ? customStyles2 : customStyles}
                contentLabel="Example Modal"
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: 22, fontWeight: 'bold', color: 'gray', paddingLeft: 10 }}>
                            {title}
                        </span>
                    </div>
                    <div>
                        <ImCross cursor="pointer" onClick={closeModal} />
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    {error && <div class="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>}
                    {
                        input ? <Input  value={value5} onChange={onChangeValue5} placeholder={placeholder5} icon Component={icon5} />
                            :
                            <Input value={value1} onChange={onChangeValue1} placeholder={placeholder1} Component={icon1} />
                    }
                    <Input value={value2} onChange={onChangeValue2} placeholder={placeholder2} Component={icon2} />
                    <Input value={value3} onChange={onChangeValue3} placeholder={placeholder3} Component={icon3} />
                    {input ? <Input type={type} value={value4} onChange={onChangeValue4} placeholder={placeholder4} Component={icon4} /> : null}
                </div>
                <div style={{ marginTop: 20 }}>
                    <Button loader={loading} onClick={onClick} children="Add" padding={5} fontSize={25} borderRadius={8} />
                </div>
            </Modal>
        </div>
    )
}

export default ModalComponent
