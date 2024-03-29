import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const DeleteTraining = ({modalIsOpen, setModalIsOpen, trainingId}) => {
    const SERVER_URL = process.env.REACT_APP_API;

    const deleteTraining = () => {
        axios.delete(SERVER_URL + '/trainings/deleteTraining/' + trainingId)
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
                <div className='text-center text-xl col-span-2'>Da li ste sigurni da želite da obrišete trening?</div>
                <button className='bg-orange-400 text-white rounded-xl font-medium w-[100px] mx-auto my-1 px-6 py-3' onClick={deleteTraining}>DA</button>
                <button className='bg-orange-400 text-white rounded-xl font-medium w-[100px] mx-auto my-1 px-6 py-3' onClick={() => {setModalIsOpen(false)}}>NE</button>
            </Modal>
        </div>
    )
}

export default DeleteTraining;