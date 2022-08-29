import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles.css';

const DeleteReservation = ({modalIsOpen, setModalIsOpen, trainingId}) => {
    const SERVER_URL = process.env.REACT_APP_API;

    const deleteReservation = () => {
        axios.delete(SERVER_URL + '/trainings/deleteReservation/' + trainingId)
            .then(response => {
                console.log(response?.data);
                setModalIsOpen(false);
                window.location.reload(false);
            })
    }

    return(
        <div>
            <Modal isOpen={modalIsOpen}
            shouldCloseOnEsc={true}
            onRequestClose={() => setModalIsOpen(false)}
            ariaHideApp={false} className='deleteModal'>
                <div className='text-center text-xl col-span-2'>Da li ste sigurni da želite da otkažete rezervaciju?</div>
                <button className='bg-orange-500 text-white rounded-xl font-medium w-[100px] mx-auto my-1 px-6 py-3' onClick={deleteReservation}>DA</button>
                <button className='bg-orange-500 text-white rounded-xl font-medium w-[100px] mx-auto my-1 px-6 py-3' onClick={() => {setModalIsOpen(false)}}>NE</button>
            </Modal>
        </div>
    )
}

export default DeleteReservation;