import React, { useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const TrainingInfo = ({modalIsOpen, setModalIsOpen, reservations}) => {

    return(
        <div>
            <Modal isOpen={modalIsOpen}
            shouldCloseOnEsc={true}
            onop
            onRequestClose={() => setModalIsOpen(false)}
            ariaHideApp={false} className='infoModal'>
                <div className='uppercase font-bold text-xl text-orange-400'>Rezervacije</div>
                {reservations.map((reservation, index) => (
                    <div className='text-left text-xl col-span-2 border-b p-2'> {index+1}. {reservation.firstname} {reservation.lastname}</div>
                ))}
            </Modal>
        </div>
    )
}

export default TrainingInfo;