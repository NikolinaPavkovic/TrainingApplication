import React, { useEffect, useState } from 'react';
import Footer from '../footer';
import Navbar from '../navbar';
import Logo from '../../assets/logo.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTrainingPage = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState(0);
    const [trainerId, setTrainerId] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [loggedUser, setLoggedUser] = useState([]);
    const [role, setRole] = useState('');
    const [trainers, setTrainers] = useState([]);
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');

    const [sDate, setSDate] = useState('');

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status !== 204) {
                setLoggedUser(response?.data);
                setRole(response?.data.roles[0]);
                if(response?.data.roles[0] !== "ROLE_TRAINER") {
                    axios.get(SERVER_URL + '/users/getTrainers')
                    .then(resp => {
                        setTrainers(resp?.data)
                    })
                }
            }
        }).catch(response => {
            console.log(response);
        })
        generateDate();
      }, [])

    const addTrainingDTO = {
        name,
        startDate,
        duration,
        trainerId,
        capacity,
        description
    }

    const trainerChange = (event) => {
        setTrainerId(event.target.value)
        setError('')
    }

    const addTraining = (e) => {
        console.log(addTrainingDTO);
        e.preventDefault();
        if(trainerId == '' || trainerId == 'X') {
            setError("Morate izabrati trenera!");
            return;
        }
        axios.post(SERVER_URL + '/trainings', addTrainingDTO)
        .then(response => {
            console.log(response?.data);
        }).catch(reason => {
            console.log(reason)
        })
    }

    const generateDate = () => {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth()+1;
        var year = today.getFullYear();
        var hours = today.getHours()+2;
        var minutes = today.getMinutes();
        if(getlength(day) === 1) {
            day = "0"+day;
        }
        if(getlength(month) === 1) {
            month = "0"+month;
        }
        if(getlength(hours) === 1) {
            hours = "0"+hours;
        }
        if(getlength(minutes) === 1) {
            minutes = "0"+minutes;
        }
        

        setSDate(year + '-' + month + '-' + day + 'T' + hours + ':' + minutes);
    }

    const getlength = (number) => {
        return number.toString().length;
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-[1240] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-5 border-t-2'>
                <div className='max-w-[600px] w-full p-10 bg-white rounded-xl z-10 shadow-xl border'>
                    <div className='text-center'>
                        <h2 className='mt-6 text-3xl font-bold text-gray-900'>Zakaži trening</h2>
                    </div>
                    <form className='mt-8' onSubmit={(e) => addTraining(e)}>
                        <div>
                            <label className='text-sm font-bold text-gray-700'>Naziv</label>
                            <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' required value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Unesite naziv'/>
                        </div>
                        <div className='mt-8'>
                            <label className='text-sm font-bold text-gray-700'>Trajanje(u minutima) </label>
                            <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' required value={duration} onChange={(e) => setDuration(e.target.value)} type='number' min='0' max='120' placeholder='Unesite trajanje'/>
                        </div>
                        <div className='mt-8'>
                            <label className='text-sm font-bold text-gray-700'>Kapacitet(max osoba) </label>
                            <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' required value={capacity} onChange={(e) => setCapacity(e.target.value)} type='number' min='1' max='35' placeholder='Unesite kapacitet'/>
                        </div>
                        <div className='mt-8'>
                            <label className='text-sm font-bold text-gray-700'>Odaberite datum i vreme početka</label>
                            <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' required value={startDate} onChange={(e) => setStartDate(e.target.value)} type='datetime-local' min={sDate}/>
                        </div>
                        <div className='mt-8'>
                            <label className='text-sm font-bold text-gray-700'>Trener</label>
                            <select onChange={trainerChange} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option value="X">Izaberite trenera</option>
                                {role == 'ROLE_TRAINER' && <option value={loggedUser.id}>{loggedUser.firstname} {loggedUser.lastname}</option>}
                                {role !== 'ROLE_TRAINER' && trainers.map((trainer, index) => (
                                <option key={index} value={trainer.id}>{trainer.firstname} {trainer.lastname}</option>))}
                            </select>
                            <p className='text-red-600'>{error}</p>
                        </div>

                        <div className='mt-8'>
                            <label className='text-sm font-bold text-gray-700'>Opis</label>
                            <textarea className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' value={description} onChange={(e) => setDescription(e.target.value)} type='text' placeholder='Unesite opis'/>
                        </div>

                        <div className='flex flex-col items-center justify-center mt-4'>
                            <button type='submit' className='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                                Dodaj trening
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default AddTrainingPage;