import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import axios from 'axios';
import { format } from 'date-fns';
import AccessDenied from './accessDeniedPage';
import DeleteTraining from './deleteTrainingModal';
import DeleteReservation from './deleteReservationModal';
import { useNavigate } from 'react-router';

const TrainingList = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState([]);
    const [role, setRole] = useState('');
    const [periods, setPeriods] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [trainingId, setTrainingId] = useState('');
    const [modalIsOpenReservation, setmodalIsOpenReservation] = useState(false);
    const [modalIsOpenTraining, setmodalIsOpenTraining] = useState(false);

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status !== 204) {
                setLoggedUser(response?.data);
                setRole(response?.data.roles[0]);
                if(response?.data.roles[0] == 'ROLE_USER') {
                    axios.get(SERVER_URL + '/trainings/getUserTrainings')
                    .then(response => {
                        var trainingsPom = []
                        response?.data.forEach(element => {
                            element.startDate = format(new Date(element.startDate), 'dd.MM.yyyy. kk:mm');
                            element.endDate = format(new Date(element.endDate), 'dd.MM.yyyy. kk:mm');
                            trainingsPom.push(element);
                        });
                        setTrainings(trainingsPom);
                    })
                } else if(response?.data.roles[0] == 'ROLE_TRAINER') {
                    axios.get(SERVER_URL + '/trainings/getTrainerTrainings')
                    .then(response => {
                        var trainingsPom = []
                        response?.data.forEach(element => {
                            element.startDate = format(new Date(element.startDate), 'dd.MM.yyyy. kk:mm');
                            element.endDate = format(new Date(element.endDate), 'dd.MM.yyyy. kk:mm');
                            trainingsPom.push(element);
                        });
                        setTrainings(trainingsPom);
                    })
                } else if(response?.data.roles[0] == 'ROLE_ADMIN') {
                    axios.get(SERVER_URL + '/trainings/getTrainingsForAdmin')
                    .then(response => {
                        var trainingsPom = []
                        response?.data.forEach(element => {
                            element.startDate = format(new Date(element.startDate), 'dd.MM.yyyy. kk:mm');
                            element.endDate = format(new Date(element.endDate), 'dd.MM.yyyy. kk:mm');
                            trainingsPom.push(element);
                        });
                        setTrainings(trainingsPom);
                    })
                }
            }
        }).catch(response => {
            console.log(response);
        })
    }, []);

    const cancel = (id) => {
        setTrainingId(id);
        if(role == 'ROLE_USER') {
            setmodalIsOpenReservation(true);
        } else if(role == 'ROLE_TRAINER' || role == 'ROLE_ADMIN') {
            setmodalIsOpenTraining(true);
        }
    }

    const addTraining = () => {
        navigate('/addTraining')
    }

    return(
        <div>
            <Navbar />
            {(role == "ROLE_USER" || role=="ROLE_TRAINER") && 
                <div>
                    <p className='w-[90%] mx-auto font-bold text-xl uppercase mt-8 text-orange-400'>REZERVISANI TRENINZI</p>
                    {trainings.map((training, index) => (
                        <div onClick={() => { cancel(training.id);}} className='w-[90%] shadow-xl md:col-span-3 p-4 my-4 mx-auto rounded-lg hover:scale-105 duration-300 border bg-gray-500 text-white cursor-pointer' key={index}>
                            <div className='sm:grid sm:grid-cols-2 flex flex-col flex-wrap'>
                                <div className='md:border-r-2 border-b-2 sm:border-b-0'>
                                <h1 className='text-4xl font-medium text-white mr-3 uppercase'>{training.name}</h1>
                                <p className='font-light text-white mt-3'>{training.startDate}</p>
                                <p>{training.duration} min</p>
                                </div>
                                <div className='ml-2'>
                                    <br />
                                    <p className='mt-2 text-w
                                    font-bold text-lg uppercase'>{training.trainer.firstname} {training.trainer.lastname}</p>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>}

                {(role == "ROLE_ADMIN") && <div>
                        <div className='flex flex-row w-[90%] mx-auto py-3'>
                            <p className='w-[50%] font-bold text-xl uppercase mt-8 py-3 text-orange-400'>TRENINZI</p>
                            <div className='w-[50%] mr-0 mt-8 relative '>
                                <button className='absolute right-0 bg-orange-400 text-white rounded-md font-medium w-[200px] px-6 py-3' onClick={addTraining}>Dodaj trening</button>
                            </div>
                        </div>
                        {trainings.map((training, index) => (
                            <div onClick={() => { cancel(training.id);}} className='w-[90%] shadow-xl md:col-span-3 p-4 my-4 mx-auto rounded-lg hover:scale-105 duration-300 border bg-gray-500 text-white cursor-pointer' key={index}>
                                <div className='sm:grid sm:grid-cols-2 flex flex-col flex-wrap'>
                                    <div className='md:border-r-2 border-b-2 sm:border-b-0'>
                                    <h1 className='text-4xl font-medium text-white mr-3 uppercase'>{training.name}</h1>
                                    <p className='font-light text-white mt-3'>{training.startDate}</p>
                                    <p>{training.duration} min</p>
                                    </div>
                                    <div className='ml-2'>
                                        <br />
                                        <p className='mt-2 text-w
                                        font-bold text-lg uppercase'>{training.trainer.firstname} {training.trainer.lastname}</p>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>}

                {role == '' && <AccessDenied />}
                <DeleteTraining modalIsOpen={modalIsOpenTraining} setModalIsOpen={setmodalIsOpenTraining} trainingId={trainingId}/>
                <DeleteReservation modalIsOpen={modalIsOpenReservation} setModalIsOpen={setmodalIsOpenReservation} trainingId={trainingId} />
        </div>
    )

}
export default TrainingList;