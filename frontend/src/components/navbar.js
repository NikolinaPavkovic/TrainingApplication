import React, {useEffect, useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import Logo from '../assets/logo.jpg'
import {Link as Link1} from 'react-scroll'
import {Link as Link2} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [nav, setNav] = useState(true);

    const SERVER_URL = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            console.log(response.status)
            if(response?.status !== 204) {
                setUser(response.data);
                setRole(response?.data.roles[0]);
            }
        }).catch(response => {
            console.log(response);
        })
      }, [])

    const handleNav = () => {
        setNav(!nav);
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload(false);
    }

    return (
        <div>
            {role == '' && 
            <div>
                <div className='flex justify-between items-center px-4 h-24 max-w-[1240px] mx-auto'>
                    <img src={Logo} alt='Code gym' />
                    <ul className='hidden md:flex'>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link1 activeclassname='active' to='home' spy={true} smooth={true}>Početna </Link1></li>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link1 to='about' spy={true} smooth={true}> O nama </Link1></li>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/login'> Prijavi se </Link2></li>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link1 to='contact' spy={true} smooth={true}>Kontakt </Link1></li>
                    </ul>
                    <div onClick={handleNav} className='block md:hidden'>
                        {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/> }
                    </div>
                    <div className={!nav ? 'z-40 fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
                    <img src={Logo} alt='Code gym' />
                        <ul className='uppercase p-4'>
                            <li className='p-4 border-b border-gray-600'><Link1 activeclassname='active' to='home' spy={true} smooth={true}>Početna </Link1></li>
                            <li className='p-4 border-b border-gray-600'><Link1 to='about' spy={true} smooth={true}> O nama </Link1></li>
                            <li className='p-4 border-b border-gray-600'><Link2 to='/login'> Prijavi se </Link2></li>
                            <li className='p-4'><Link1 to='contact' spy={true} smooth={true}>Kontakt </Link1></li>
                        </ul>
                    </div>
                </div>
            </div>}

            {role == 'ROLE_USER' && 
            <div>
                <div className='flex justify-between items-center px-4 h-24 max-w-[1240px] mx-auto'>
                    <img src={Logo} alt='Code gym' />
                    <ul className='hidden md:flex'>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/profile' spy={true} smooth={true}>Profil </Link2></li>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/calendar' spy={true} smooth={true}>Raspored treninga </Link2></li>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/trainings' spy={true} smooth={true}>Moji treninzi </Link2></li>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/memberships' spy={true} smooth={true}>Članarine </Link2></li>
                        <li className='p-4 hover:scale-110 hover:cursor-pointer' onClick={logout}>Odjavi se </li>
                    </ul>
                    <div onClick={handleNav} className='block md:hidden'>
                        {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/> }
                    </div>
                    <div className={!nav ? 'z-40 fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
                    <img src={Logo} alt='Code gym' />
                        <ul className='uppercase p-4'>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/profile' spy={true} smooth={true}>Profil </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/calendar' spy={true} smooth={true}>Raspored treninga </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/trainings' spy={true} smooth={true}>Moji treninzi </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/memberships' spy={true} smooth={true}>Članarine </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer' onClick={logout}>Odjavi se </li>
                        </ul>
                    </div>
                </div>
            </div>}

            {role=='ROLE_ADMIN' && 
                <div>
                    <div className='flex justify-between items-center px-4 h-24 max-w-[1240px] mx-auto'>
                        <img src={Logo} alt='Code gym' />
                        <ul className='hidden md:flex'>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/profile' spy={true} smooth={true}>Profil </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/calendar' spy={true} smooth={true}>Raspored treninga </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/trainings' spy={true} smooth={true}>Treninzi </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/memberships' spy={true} smooth={true}>Članarine </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/users' spy={true} smooth={true}>Korisnici </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/scan' spy={true} smooth={true}>Skeniraj </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer' onClick={logout}>Odjavi se </li>
                        </ul>
                        <div onClick={handleNav} className='block md:hidden'>
                            {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/> }
                        </div>
                        <div className={!nav ? 'z-40 fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
                        <img src={Logo} alt='Code gym' />
                            <ul className='uppercase p-4'>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/profile' spy={true} smooth={true}>Profil </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/calendar' spy={true} smooth={true}>Raspored treninga </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/trainings' spy={true} smooth={true}>Treninzi </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/memberships' spy={true} smooth={true}>Članarine </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/users' spy={true} smooth={true}>Korisnici </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/scan' spy={true} smooth={true}>Skeniraj </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer' onClick={logout}>Odjavi se </li>
                            </ul>
                        </div>
                    </div>
                </div>}

                {role=='ROLE_TRAINER' && 
                <div>
                    <div className='flex justify-between items-center px-4 h-24 max-w-[1240px] mx-auto'>
                        <img src={Logo} alt='Code gym' />
                        <ul className='hidden md:flex'>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/profile' spy={true} smooth={true}>Profil </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/calendar' spy={true} smooth={true}>Raspored treninga </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/trainings' spy={true} smooth={true}>Moji treninzi </Link2></li>
                            <li className='p-4 hover:scale-110 hover:cursor-pointer' onClick={logout}>Odjavi se </li>
                        </ul>
                        <div onClick={handleNav} className='block md:hidden'>
                            {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/> }
                        </div>
                        <div className={!nav ? 'z-40 fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
                        <img src={Logo} alt='Code gym' />
                            <ul className='uppercase p-4'>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/profile' spy={true} smooth={true}>Profil </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/calendar' spy={true} smooth={true}>Raspored treninga </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/trainings' spy={true} smooth={true}>Moji treninzi </Link2></li>
                                <li className='p-4 hover:scale-110 hover:cursor-pointer' onClick={logout}>Odjavi se </li>
                            </ul>
                        </div>
                    </div>
                </div>}

        </div>
    )
}

export default Navbar;