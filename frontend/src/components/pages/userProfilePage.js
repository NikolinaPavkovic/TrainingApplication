import React, { useEffect, useState } from 'react';
import {AiOutlineEdit} from 'react-icons/ai';
import Logo from '../../assets/logo.jpg'
import QRCode from 'qrcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';

const UserProfile = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const [isEditting, setIsEdditing] = useState(false);
    const [codeText, setCodeText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [membership, setMembership] = useState([]);
    const [noMem, setNoMem] = useState('Nema clanarinu')

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status === 204) {
                navigate('/accessDenied');
            }
            axios.get(SERVER_URL + '/userMemberships/get/' + response.data.username)
            .then(resp => {
                setMembership(resp.data);
            }).catch(reason => {
                console.log(reason);
            })
            setUser(response.data);
            setCodeText(response.data.username);
        }).catch(response => {
            console.log(response);
        })
        setCodeText('pavkovicn@hotmail.com');
        generateQrCode();
    }, [codeText])

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(codeText);
            setImageUrl(response);
        } catch (error) {
            
        }
    }

    const editProfile = () => {
        setIsEdditing(!isEditting);
    }

    const handleEdit = () => {
        setIsEdditing(false);
    }

    return (
        <div >
            <Navbar />
            {!isEditting ? <div className='p-16 max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow max-w-[600px] w-full rounded-xl relative '>
                    <AiOutlineEdit size={30} onClick={editProfile} className='absolute right-5 top-5 cursor-pointer '/>
                    <div className='mt-10 text-center border-b pb-12'>
                        <h1 className='text-4xl font-medium text-gray-700'>{user?.firstname} {user?.lastname}</h1>
                        <p className='font-light text-gray-600 mt-3'>Novi Sad, Srbija</p>
                        <p className='mt-8 text-orange-500 font-bold uppercase'>{membership?.membership?.name || noMem}</p>
                        <p className='mt-8 text-gray-500'>{user?.username}</p>
                        <p className='text-gray-500'>{user?.phone}</p>
                    </div>
                    <div className='mt-12 flex flex-col justify-center'>
                        <img src={imageUrl} alt='/' />
                    </div>
                </div>
            </div> :
            <div className='max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow max-w-[600px] w-full rounded-xl'>
                <img src={Logo} alt='Code gym' />
                    <div className='mt-10 text-center border-b pb-12 grid grid-cols-3'>
                        <p className='text-left font-light text-gray-600 mt-3'>Ime</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'Nikolina'}/>
                        <p className='text-left font-light text-gray-600 mt-3'>Prezime</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'Pavkovic'}/>
                        <p className='text-left font-light text-gray-600 mt-3'>Email</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'pavkovicn@hotmail.com'}/>
                        <p className='text-left font-light text-gray-600 mt-3'>Telefon</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'0658886407'}/>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <button onClick={handleEdit} className='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                            OK
                        </button>
                        <button onClick={editProfile} className='w-[200px] rounded-md font-medium py-3 text-gray-500 border'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}

        </div>
    )
}
export default UserProfile;