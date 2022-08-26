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
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(SERVER_URL + '/users/getLoggedUser')
        .then(response => {
            console.log(response.status)
            if(response?.status === 204) {
                setIsLogged(false);
            } else {
                setUser(response.data);
                setIsLogged(true);
            }
        }).catch(response => {
            console.log(response);
        })
      }, [])

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div>
            {!isLogged && 
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
                    <div className={!nav ? 'fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
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
        </div>
    )
}

export default Navbar;