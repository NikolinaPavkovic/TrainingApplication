import React, { useEffect, useState } from 'react';
import {AiOutlineEdit} from 'react-icons/ai';
import Logo from '../../assets/logo.jpg'
import QRCode from 'qrcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import Footer from '../footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const [isEditting, setIsEdditing] = useState(false);
    const [codeText, setCodeText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [role, setRole] = useState('');
    const [membership, setMembership] = useState([]);
    const [noMem, setNoMem] = useState('Nema clanarinu')
    const [id, setId] = useState(0);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [passMatch, setPassMatch] = useState(true);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [error, setError] = useState('');

    const editProfileDTO = {
        id,
        firstname,
        lastname,
        phone,
        username
    }

    const changePasswordDTO = {
        oldPassword,
        newPassword
    }

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status === 204) {
                navigate('/login');
            }
            axios.get(SERVER_URL + '/userMemberships/get/' + response.data.username)
            .then(resp => {
                setMembership(resp?.data);
            }).catch(reason => {
                console.log(reason);
            })
            setUser(response?.data);
            setRole(response?.data?.roles[0])
            setId(response?.data?.id)
            setFirstname(response?.data?.firstname);
            setLastname(response?.data?.lastname);
            setPhone(response?.data?.phone);
            setUsername(response?.data?.username);
            setCodeText(response?.data?.username);
        }).catch(response => {
            console.log(response);
        })
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

    const handleEditProfile = () => {
        axios.put(SERVER_URL + '/users/edit', editProfileDTO)
        .then(response => {
            console.log(response?.data);
        })
        window.location.reload(false);
        setIsEdditing(false);
    }

    const changePassword = () => {
        setEditPassword(!editPassword);
    }

    const handleEditPassword = (e) => {
        e.preventDefault();
        axios.put(SERVER_URL + '/users/changePassword', changePasswordDTO)
        .then(response => {
            console.log(response?.data)
            if(response?.data == 'Wrong current password') {
                setNewPassword('')
                setOldPassword('')
                setRepeatedPassword('');
                toast.error('Pogrešna trenutna lozinka.')
            }
        }).catch(reason => {
            console.log(reason)
        })
    }

    return (
        <div >
            <Navbar />
            <ToastContainer />
            {!isEditting && !editPassword && <div className='p-16 max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow max-w-[600px] w-full rounded-xl relative '>
                    <AiOutlineEdit size={30} onClick={editProfile} className='absolute right-5 top-5 cursor-pointer '/>
                    <div className='mt-10 text-center border-b pb-12'>
                        <h1 className='text-4xl font-medium text-gray-700'>{user?.firstname} {user?.lastname}</h1>
                        <p className='font-light text-gray-600 mt-3'>Novi Sad, Srbija</p>
                        {!role=='ROLE_ADMIN' && <p className='mt-8 text-orange-500 font-bold uppercase'>{membership?.membership?.name || noMem}</p>}
                        {role=='ROLE_ADMIN' && <p className='mt-8 text-orange-500 font-bold uppercase'>ADMIN</p>}
                        <p className='mt-8 text-gray-500'>{user?.username}</p>
                        <p className='text-gray-500'>{user?.phone}</p>
                    </div>
                    {role=='ROLE_USER' && <div className='mt-12 flex flex-col justify-center'>
                        <img src={imageUrl} alt='/' />
                    </div>}
                </div>
            </div> }
            {isEditting && !editPassword && <div className='max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow max-w-[600px] w-full rounded-xl'>
                    <form>
                        <img src={Logo} alt='Code gym' className='mx-auto'/>
                        <div className='mt-10 text-center border-b pb-12 grid grid-cols-3'>
                            <p className='text-left font-light text-gray-600 mt-3'>Ime</p>
                            <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                            <p className='text-left font-light text-gray-600 mt-3'>Prezime</p>
                            <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                            <p className='text-left font-light text-gray-600 mt-3'>Email</p>
                            <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <p className='text-left font-light text-gray-600 mt-3'>Telefon</p>
                            <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            <p className='mt-3 col-span-3 text-blue-800 underline text-left font-light cursor-pointer hover:scale-y-105' onClick={changePassword}>Promeni lozinku</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mt-4'>
                            <button onClick={handleEditProfile} className='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                                OK
                            </button>
                            <button onClick={editProfile} className='w-[200px] rounded-md font-medium py-3 text-gray-500 border'>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>}

            {editPassword && <div className='max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow max-w-[600px] w-full rounded-xl'>
                <form>
                    <img src={Logo} alt='Code gym' className='mx-auto'/>
                        <div className='mt-10 text-center border-b pb-12 grid grid-cols-3'>
                            <p className='text-left font-light text-gray-600 mt-3'>Trenutna lozinka</p>
                            <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='password' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            <p className='text-left font-light text-gray-600 mt-3'>Nova lozinka</p>
                            <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            <p className='text-left font-light text-gray-600 mt-3'>Ponovite novu lozinku</p>
                            <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='password' required value={repeatedPassword} onChange={(e) => {
                                setRepeatedPassword(e.target.value);
                                if(e.target.value !== newPassword) {
                                    setPassMatch(false);
                                    setDisabledBtn(true);
                                } else {
                                    setPassMatch(true);
                                    setDisabledBtn(false);
                                }
                            }}/>
                            <p></p>
                            {!passMatch && <p className='text-left col-span-2 text-xs text-red-600'>Lozinke nisu jednake!</p>}
                        </div>
                        <div className='flex flex-col items-center justify-center mt-4'>
                            <button onClick={(e) => handleEditPassword(e)} disabled={disabledBtn} className='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                                OK
                            </button>
                            <button onClick={changePassword} className='w-[200px] rounded-md font-medium py-3 text-gray-500 border'>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>}

            <Footer />

        </div>
    )
}
export default UserProfile;