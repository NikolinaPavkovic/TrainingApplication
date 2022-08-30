import React, { useEffect, useState } from 'react';
import Footer from '../footer';
import Navbar from '../navbar';
import Logo from '../../assets/logo.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccessDenied from './accessDeniedPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMembershipPage = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [durationInDays, setDurationInDays] = useState(0);
    const [benefits, setBenefits] = useState([]);
    const [benefit, setBenefit] = useState('');
    const [role, setRole] = useState('');

    const addMembershipDTO = {
        name,
        price,
        durationInDays,
        benefits
    }

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status !== 204) {
                setRole(response?.data.roles[0]);
            }
        }).catch(response => {
            console.log(response);
        })
      }, [])

    const addMembership = (e) => {
        e.preventDefault();
        axios.post(SERVER_URL + '/memberships', addMembershipDTO)
        .then(response => {
            console.log(response?.data);
            toast.success('Uspešno ste dodali članarinu!')
            navigate('/memberships');
        }).catch(reason => {
            console.log(reason)
        })
    }

    const addBenefit = () => {
        if(benefit !== "" || benefit !== " ") {
            benefits.push(benefit);
        }
        setBenefit('');
    }

    return (
        <div>
            <Navbar />
            <ToastContainer />
            {role=='ROLE_ADMIN' && <div className='max-w-[1240] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-5 border-t-2'>
                <div className='max-w-[600px] w-full p-10 bg-white rounded-xl z-10 shadow-xl border'>
                <img src={Logo} alt='Code gym' className='mx-auto'/>
                    <div className='text-center'>
                        <h2 className='mt-6 text-3xl font-bold text-gray-900'>Dodavanje članarine</h2>
                    </div>
                    <form className='mt-8' onSubmit={(e) => addMembership(e)}>
                        <div>
                            <label className='text-sm font-bold text-gray-700'>Naziv</label>
                            <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Unesite naziv'/>
                        </div>
                        <div className='mt-8'>
                            <label className='text-sm font-bold text-gray-700'>Cena</label>
                            <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={price} onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Unesite cenu'/>
                        </div>
                        <div className='mt-8'>
                            <label className='text-sm font-bold text-gray-700'>Trajanje(u danima) </label>
                            <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={durationInDays} onChange={(e) => setDurationInDays(e.target.value)} type='number' placeholder='Unesite trajanje'/>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <label className='text-sm font-bold text-gray-700'>Pogodnosti</label>
                            <input className=' w-full text-base border-b mx-4 border-gray-300 focus:outline-none focus:border-orange-400' value={benefit} onChange={(e) => setBenefit(e.target.value)} type='text' placeholder='Unesite pogodnost'/>
                            <button onClick={addBenefit} type='button' className='bg-orange-400 w-[100px] rounded-md font-medium my-3 py-3 text-white'>
                                Dodaj
                            </button>
                        </div>
                        {benefits.length != 0 ? (benefits.map((b, index) => (
                            <div key={index} className="w-full text-sm font-medium bg-white rounded-lg border border-gray-200">
                            <p className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100">
                                {b}
                            </p>
                            </div>
                        ))) : (
                            <div></div>
                        )}
                        
                        <div className='flex flex-col items-center justify-center mt-4'>
                            <button type='submit' className='bg-orange-400 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                                Dodaj članarinu
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>}
            {role != "ROLE_ADMIN" && <AccessDenied />}
            <Footer />
        </div>
    )
}
export default AddMembershipPage;