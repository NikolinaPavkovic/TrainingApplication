import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Sign from '../assets/teg.png'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteMembership from './pages/deleteMembershipModal';

const Cards = () => {
    const navigate = useNavigate();
    const SERVER_URL = process.env.REACT_APP_API;
    const [memberships, setMemberships] = useState([]);
    const [role, setRole] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [membershipId, setMembershipId] = useState(0);
    const [loggedUser, setLoggedUser] = useState([]);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status !== 204) {
                setRole(response?.data?.roles[0]);
                setIsLogged(true);
                setLoggedUser(response?.data)
            }
        })
        .catch(reason =>{
            console.log(reason);
        })

        axios.get(SERVER_URL + '/memberships')
        .then(response => {
            console.log(response?.data)
            setMemberships(response?.data)
        }).catch(response => {
            console.log(response);
        })
      }, [])

    const reserveMembership = (id) => {
        if(!isLogged) { // ako korisnik nije ulogovan
            navigate('/login');
        } else { //ako jeste
            axios.post(SERVER_URL + '/userMemberships', {userId: loggedUser.id, membershipId: id})
            .then(response => {
                if(response?.data == 'User membership already exists.') {
                    toast.warn('Već imate važeću članarinu.')
                }
            })
        }
    }

    const addMembership = () => {
        navigate('/addMembership')
    }

    const deleteMembership = (id) => {
        if(role == 'ROLE_ADMIN') {
            setMembershipId(id)
            setModalIsOpen(true);
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='w-full py-[5rem] px-4 bg-white'>
                <div className='max-w-[1240px] mx-auto mb-16'>
                    <button className=' bg-orange-400  text-white rounded-md font-medium w-[200px] px-6 py-3' onClick={addMembership}>Dodaj clanarinu</button>
                </div>
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 md:grid-rows-2 gap-8'>
                    {memberships.length ? (memberships.map((membership, index) => (
                        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 border' key={index} onClick={() => deleteMembership(membership.id)}>
                            <img className='w-20 mx-auto mt-[-3rem]' src={Sign} alt='/'/>
                            <h2 className='text-3xl font-bold text-center py-8 uppercase'>{membership.name}</h2>
                            <p className='text-center text-5xl font-bold'>{membership.price} rsd</p>
                            {membership.benefits.map((benefit, index) => (
                            <div className='text-center font-medium' key={benefit.id}>
                                {index == 0 && <p className='py-2 border-b border-t mx-8 mt-8'>{benefit.name}</p>}
                                {index != 0 && <p className='py-2 border-b mx-8'>{benefit.name}</p>}
                            </div>))}
                            {role!='ROLE_ADMIN' && <button className='bg-orange-400 text-white rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3' onClick={()=>{reserveMembership(membership.id)}} >Rezerviši paket</button>}
                        </div>
                    ))) : (
                        <div className='col-span-3 max-w-[800px] mt-[-96px] w-full h-screen text-center mx-auto flex flex-col justify-center'>
                            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Nema postojećih članarina.</h1>
                        </div>
                    )}
                </div>
            </div>
            <DeleteMembership modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} membershipId={membershipId}/>
        </div>
    )
}
export default Cards;