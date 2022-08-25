import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.jpg'
import axios from 'axios';

const Login = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            console.log(response.data);
        })
      }, [])

    const login = (e) => {
        e.preventDefault();
        try {
            axios.post(SERVER_URL + '/login', new URLSearchParams({
                username: username,
                password: password
            }))
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
            })
        } catch (error) {
            console.log(error.response)
        }
    }
    return(
        <div className='max-w-[1240] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-500'>
	        <div className='max-w-[450px] w-full p-10 bg-white rounded-xl z-10 shadow-xl border'>
            <img src={Logo} alt='Code gym' />
                <div className='text-center'>
			        <h2 className='mt-6 text-3xl font-bold text-gray-900'>Dobrodošli nazad!</h2>
			        <p className='mt-2 text-sm text-gray-600'>Prijavite se na Vaš nalog</p>
		        </div>
                <form className='mt-8' onSubmit={login}>
                    <div>
                        <label className='text-sm font-bold text-gray-700'>Email</label>
                        <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' required value={username} onChange={(e) => setUsername(e.target.value)} type='email' placeholder='Unesite email'/>
                    </div>
                    <div className='mt-8'>
                        <label className='text-sm font-bold text-gray-700'>
                            Lozinka
                        </label>
                        <input className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' required value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Unesite lozinku'/>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <button type='submit' className='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                            Prijavi se
                        </button>
                    </div>
                    <p className='flex flex-col items-center justify-center text-center text-md text-gray-500'>
				        <span>Još uvek nemate nalog?</span>
				        <a href='/register' className='text-indigo-500 hover:underline cursor-pointer'>Registrujte se</a>
			        </p>
                </form>
	        </div>
        </div>
    )
}
export default Login;