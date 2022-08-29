import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../footer';
import Navbar from '../navbar';
import axios from 'axios';
import AccessDenied from './accessDeniedPage';

const UserProfileForAdmin = () => {
    const {username} = useParams();
    
    const SERVER_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [role, setRole] = useState('');
    const [profileUser, setProfileUser] = useState([]);
    const [noMem, setNoMem] = useState('Nema clanarinu');
    const [userProfileRole, setUserProfileRole] = useState('');


    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status === 204) {
                navigate('/login');
            }
            setUser(response?.data);
            setRole(response?.data?.roles[0])

            axios.get(SERVER_URL + '/users/' + username)
            .then(resp => {
                setProfileUser(resp?.data);
                setUserProfileRole(resp?.data?.roles[0].name)
                console.log(resp?.data);
                console.log(resp?.data?.roles[0].name);
                if(resp?.data?.roles[0].name == 'ROLE_USER') {

                    axios.get(SERVER_URL + '/users/getUserForAdmin/' + username)
                    .then(res => {
                        console.log(res?.data);
                        setProfileUser(res?.data);
                    })
                    .catch(reason => {
                        console.log(reason);
                    })
                }
            })
            .catch(reason => {
                console.log(reason);
            })

        }).catch(response => {
            console.log(response);
        })
    }, [])

    return(
        <div>
            <Navbar />
            {role == 'ROLE_ADMIN' &&  userProfileRole == 'ROLE_USER' &&
            <div>
                <div className='p-16 max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                    <div className='p-8 bg-white shadow max-w-[600px] w-full rounded-xl relative '>
                        <div className='mt-10 text-center border-b pb-12'>
                            <h1 className='text-4xl font-medium text-gray-700'>{profileUser?.user?.firstname} {profileUser?.user?.lastname}</h1>
                            <p className='font-light text-gray-600 mt-3'>Novi Sad, Srbija</p>
                            <p className='mt-8 text-orange-400 font-bold uppercase'>{profileUser?.membership?.name || noMem}</p>
                            <p className='mt-8 text-gray-500'>{profileUser?.user?.username}</p>
                            <p className='text-gray-500'>{profileUser?.user?.phone}</p>
                        </div>
                    </div>
                </div> 
            </div>
            }

            {role == 'ROLE_ADMIN' &&  userProfileRole == 'ROLE_TRAINER' &&
            <div>
                <div className='p-16 max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                    <div className='p-8 bg-white shadow max-w-[600px] w-full rounded-xl relative '>
                        <div className='mt-10 text-center border-b pb-12'>
                            <h1 className='text-4xl font-medium text-gray-700'>{profileUser?.firstname} {profileUser?.lastname}</h1>
                            <p className='font-light text-gray-600 mt-3'>Novi Sad, Srbija</p>
                            <p className='mt-8 text-orange-400 font-bold uppercase'>TRENER</p>
                            <p className='mt-8 text-gray-500'>{profileUser?.username}</p>
                            <p className='text-gray-500'>{profileUser?.phone}</p>
                        </div>
                    </div>
                </div> 
            </div>
            }
            
            
            {role == '' && <AccessDenied />}
            <Footer />
        </div>
    )
}
export default UserProfileForAdmin;