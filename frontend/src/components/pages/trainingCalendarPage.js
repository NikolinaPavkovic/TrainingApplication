import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import Calendar from 'react-awesome-calendar';
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer';

const TrainingCalendar = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const [loggedUser, setLoggedUser] = useState([]);
    const [role, setRole] = useState('');
    const [periods, setPeriods] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [trainingId, setTrainingId] = useState('');
    const [message, setMessage] = useState('');

    const reserveDTO = {
        userId: loggedUser.id,
        trainingId: trainingId
    };

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status !== 204) {
                setLoggedUser(response?.data);
                setRole(response?.data.roles[0]);
                axios.get(SERVER_URL + '/trainings/getPeriods')
                .then(resp => {
                    var dates = resp?.data;
                    console.log(resp?.data);
                    var periodsPom = []
                    for(let dat of dates) {
                        var event = {
                            color: '#f39c12',
                            from: dat.startDate,
                            to: dat.endDate,
                            title: "Trening: " + dat.name + ", trener: " + dat.trainer.firstname + " " + dat.trainer.lastname
                        }
                        periodsPom.push(event)
                    }
                    console.log(periodsPom);
                    setPeriods(periodsPom);
                })
                if(response?.data.roles[0]=="ROLE_USER") {
                    axios.get(SERVER_URL + '/userMemberships/get/' + response?.data?.username)
                    .then(resp => {
                        
                        if(resp?.data != 'No membership.') {
                            axios.get(SERVER_URL + '/trainings/getTrainingsForReservation')
                            .then(r => {
                                var trainingsPom = []
                                r?.data.forEach(element => {
                                    element.startDate = format(new Date(element.startDate), 'dd.MM.yyyy. kk:mm');
                                    element.endDate = format(new Date(element.endDate), 'dd.MM.yyyy. kk:mm');
                                    trainingsPom.push(element);
                                });
                                setTrainings(trainingsPom);
                                console.log(trainingsPom);
                            }).catch(reason => {
                                console.log(reason);
                            });
                        } else {
                            setMessage('Da biste rezervisali trening morate da imate validnu članarinu.');
                        }
                    }).catch(reason => {
                        console.log(reason);
                    })
                }
                
            }
        }).catch(response => {
            console.log(response);
        })
      }, [])

      const reserve = (id) => {
        const request = {...reserveDTO, trainingId: id}

        console.log(request)
        axios.post(SERVER_URL + '/trainings/makeReservation', request)
        .then(response => {
            if(response?.data == 'ok') {
                toast.success('Uspešno ste rezervisali trening!')
            } else if(response?.data == 'Maximum capacity is full.') {
                toast.info('Termin je popunjen.');
            } else if(response?.data == 'Same user cannot book twice.') {
                toast.warn('Već ste rezervisali ovaj termin!')
            }
            console.log(response?.data);
        })
        .catch(reason => {
            console.log(reason);
        })
      }

    return(
        <div>
            <Navbar />
            <ToastContainer />
            <div className='p-8 md:p-16 max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow w-full rounded-xl relative'>
                <Calendar 
                    events={periods}
                />
                    {role == "ROLE_USER" && <div>
                        <p className='font-bold text-lg uppercase mt-8'>REZERVIŠI TRENING</p>
                        <p className='text-orange-500'>{message}</p>
                        {trainings.map((training, index) => (
                            <div onClick={() => { reserve(training.id);}} className='w-[90%] shadow-xl md:col-span-3 p-4 my-4 mx-auto rounded-lg hover:scale-105 duration-300 border bg-gray-500 text-white cursor-pointer' key={index}>
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
                </div>
            </div>
            <Footer />
            
        </div>
    )
}
export default TrainingCalendar;