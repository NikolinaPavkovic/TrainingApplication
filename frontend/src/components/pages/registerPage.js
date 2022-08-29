import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const SERVER_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [passMatch, setPassMatch] = useState(true);
    const [diabledBtn, setDisabledBtn] = useState(true);

    const registerDTO = {
        firstname,
        lastname,
        phone,
        username,
        password
    }

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            if(response?.status !== 204) {
                navigate('profile');
            }
        }).catch(response => {
            console.log(response);
        })
      }, [])

    const register = (e) => {
        e.preventDefault();
        axios.post(SERVER_URL + '/users/register', registerDTO)
        .then(response => {
            navigate('/login')
        })
        .catch(response => {
            console.log(response)
        });
    }

    return (
        <div className='max-w-[1240] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-5 bg-gray-500'>
	        <div className='max-w-[450px] w-full p-10 bg-white rounded-xl z-10 shadow-xl border'>
            <img src={Logo} alt='Code gym' />
                <div className='text-center'>
			        <h2 className='mt-6 text-3xl font-bold text-gray-900'>Registruj se</h2>
		        </div>
                <form className='mt-8' onSubmit={e => register(e)}>
                    <div>
                        <label className='text-sm font-bold text-gray-700'>Ime</label>
                        <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={firstname} onChange={(e) => setFirstName(e.target.value)} type='text' placeholder='Unesite ime'/>
                    </div>
                    <div className='mt-8'>
                        <label className='text-sm font-bold text-gray-700'>Prezime</label>
                        <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={lastname} onChange={(e) => setLastname(e.target.value)} type='text' placeholder='Unesite prezime'/>
                    </div>
                    <div className='mt-8'>
                        <label className='text-sm font-bold text-gray-700'>Telefon</label>
                        <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={phone} onChange={(e) => setPhone(e.target.value)} type='text' placeholder='Unesite telefon'/>
                    </div>
                    <div className='mt-8'>
                        <label className='text-sm font-bold text-gray-700'>Email</label>
                        <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={username} onChange={(e) => setUsername(e.target.value)} type='email' placeholder='Unesite email'/>
                    </div>
                    <div className='mt-8'>
                        <label className='text-sm font-bold text-gray-700'>
                            Lozinka
                        </label>
                        <input className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Unesite lozinku'/>
                    </div>
                    <div className='mt-8'>
                        <label className='text-sm font-bold text-gray-700'>
                            Ponovite lozinku
                        </label>
                        <input className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-400' required value={repeatedPassword} onChange={(e) => {
                            setRepeatedPassword(e.target.value);
                            if(e.target.value !== password) {
                                setPassMatch(false);
                                setDisabledBtn(true);
                            } else {
                                setPassMatch(true);
                                setDisabledBtn(false);
                            }
                            }} type='password' placeholder='Ponovo unesite lozinku'/>
                        {!passMatch && <p className='text-xs text-red-600'>Lozinke nisu jednake!</p>}
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <button type='submit' className='bg-orange-400 w-[200px] rounded-md font-medium my-3 py-3 text-white' disabled={diabledBtn}>
                            Registruj se
                        </button>
                    </div>
                    <p className='flex flex-col items-center justify-center text-center text-md text-gray-500'>
				        <span>Imate nalog?</span>
				        <a href='/login' className='text-indigo-500 hover:underline cursor-pointer'>Prijavite se</a>
			        </p>
                </form>
	        </div>
        </div>
    )
}
export default Register;