import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const DeleteUser = ({modalIsOpen, setModalIsOpen, userId}) => {
    const SERVER_URL = process.env.REACT_APP_API;

    const deleteUser = () => {
        axios.delete(SERVER_URL + '/users/' + userId)
            .then(response => {
                console.log(response?.data);
                window.location.reload(false);
            })
    }

    return(
        <div>
            <Modal isOpen={modalIsOpen}
            shouldCloseOnEsc={true}
            onRequestClose={() => setModalIsOpen(false)}
            ariaHideApp={false} className='deleteModal'>
                <div className='text-center text-xl col-span-2'>Da li ste sigurni da želite da obrišete korisnika?</div>
                <button className='bg-orange-400 text-white rounded-xl font-medium w-[100px] mx-auto my-1 px-6 py-3' onClick={deleteUser}>DA</button>
                <button className='bg-orange-400 text-white rounded-xl font-medium w-[100px] mx-auto my-1 px-6 py-3' onClick={() => {setModalIsOpen(false)}}>NE</button>
            </Modal>
        </div>
    )
}

export default DeleteUser;