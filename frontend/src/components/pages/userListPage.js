import React, { useEffect, useState } from 'react';
import Sign from '../../assets/user.png'
import axios from 'axios';
import Footer from '../footer';
import Navbar from '../navbar';

const UserList = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        axios.get(SERVER_URL + '/users')
        .then(response => {
            setUsers(response?.data);
            console.log(response?.data)
        }).catch(reason => {
            console.log(reason)
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

    return(
        <div>
            <Navbar />
            <div className='w-full py-[10rem] px-4 bg-gray-500'>
                <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                        <input type="search" onChange={(e) => performSearch(e)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleSearch"
                        placeholder="Pretraži korisnike..."
                        />
                    </div>
                </div>
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 md:grid-rows-2 gap-8'>
                    {users.length ? (users.map((user) => (
                        <div className='w-[70%] shadow-xl md:col-span-3 p-4 my-4 mx-auto rounded-lg hover:scale-105 duration-300 border bg-white' key={user.id}>
                        <div className='sm:grid sm:grid-cols-2 flex flex-col flex-wrap'>
                            <div className='md:border-r-2 border-b-2 sm:border-b-0'>
                            <h1 className='text-4xl font-medium text-gray-700 mr-3'>{user.firstname} {user.lastname}</h1>
                            <p className='font-light text-gray-700 mt-3'>{user.username}</p>
                            <p className=''>{user.phone}</p>
                            </div>
                            <div className='ml-2'>
                                <br />
                                <p className='mt-2 text-orange-500 font-bold uppercase'>{role(user.roles[0])}</p>
                            </div>
                        </div>
                    </div>
                    ))) :
                    <div className='max-w-[800px] mt-[-96px] col-span-3 w-full h-screen text-center mx-auto flex flex-col justify-center'>
                        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Nema rezultata pretrage</h1>
                    </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default UserList;