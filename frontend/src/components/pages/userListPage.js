import React, { useEffect, useState } from 'react';
import Sign from '../../assets/user.png'
import axios from 'axios';
import Footer from '../footer';
import Navbar from '../navbar';
import DeleteUser from './deleteUserModal';
import { useNavigate } from 'react-router-dom';
import {AiOutlineDelete} from 'react-icons/ai';
import UserProfile from './userProfilePage';
import AccessDenied from './accessDeniedPage';

const UserList = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [roleLogged, setRoleLogged] = useState('');

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status !== 204) {
                setRoleLogged(response?.data.roles[0]);
                axios.get(SERVER_URL + '/users')
                .then(resp => {
                    setUsers(resp?.data);
                    console.log(resp?.data)
                }).catch(reason => {
                    console.log(reason)
                })
            }
        }).catch(reason => {
            console.log(reason);
        })
    }, [])

    const role = (roleName) => {
        if(roleName === 'ROLE_TRAINER') {
            return 'TRENER'
        } else if(roleName === 'ROLE_USER') {
            return 'KORISNIK'
        }
    }

    const performSearch = (e) => {
        const okParams = [];
        const searchParams = e.target.value.split(' ');
        searchParams.forEach(param => {
            if(param != '') okParams.push(param);
        });
        if(okParams.length != 0){
            axios.post(SERVER_URL + '/users/search', okParams)
            .then(response => {
                console.log(response?.data)
                setUsers(response?.data)
            }).catch(reason => {
                console.log(reason);
            })
        }
    }

    const deleteUser = (id) => {
        setUserId(id)
        setModalIsOpen(true);
    }

    const addTrainer = () => {
        navigate('/registerTrainer');
    }

    const goToUserProfile = (username) => {
        navigate('/user/' + username)
    }

    return(
        <div>
            <Navbar />
            {roleLogged=='ROLE_ADMIN' && <div className='w-full py-[3rem] px-4 bg-gray-500'>
                <div className='max-w-[1240px] mx-auto mb-4 flex flex-row justify-center'>
                    <div className='flex w-[70%]'>
                        <button className='bg-orange-400 text-white rounded-md font-medium w-[200px] px-6 py-3' onClick={addTrainer}>Dodaj trenera</button>
                    </div>
                </div>
                <div className="flex justify-center max-w-[1240px] mx-auto">
                    <div className="w-[70%] mx-auto ">
                        <input type="search" onChange={(e) => performSearch(e)} className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleSearch"
                        placeholder="Pretraži korisnike..."
                        />
                    </div>
                </div>
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 md:grid-rows-2 gap-4'>
                    {users.length ? (users.map((user) => (
                        <div className='w-[70%] shadow-xl md:col-span-3 p-4 my-4 mx-auto rounded-lg hover:scale-105 duration-300 border bg-white' key={user.id} onClick={() => goToUserProfile(user.username)}>
                        <div className='sm:grid sm:grid-cols-2 flex flex-col flex-wrap'>
                            <div className='md:border-r-2 border-b-2 sm:border-b-0'>
                                <h1 className='text-4xl font-medium text-gray-700 mr-3'>{user.firstname} {user.lastname}</h1>
                                <p className='font-light text-gray-700 mt-3'>{user.username}</p>
                                <p className=''>{user.phone}</p>
                            </div>
                            <div className='ml-2 relative'>
                                <AiOutlineDelete size={25} className='absolute right-0 top-2 cursor-pointer' onClick={() => deleteUser(user.id)}/>
                                <p className='mt-2 text-orange-400 font-bold uppercase'>{role(user.roles[0])}</p>
                            </div>
                        </div>
                    </div>
                    ))) :
                    <div className='max-w-[800px] mt-[-96px] col-span-3 w-full h-screen text-center mx-auto flex flex-col justify-center'>
                        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Nema rezultata pretrage</h1>
                    </div>
                    }
                </div>
            </div>}
            <DeleteUser modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} userId={userId}/>
            {roleLogged != 'ROLE_ADMIN' && <AccessDenied />}
            <Footer />
        </div>
    )
}
export default UserList;