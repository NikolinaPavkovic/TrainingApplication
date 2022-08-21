import React, {useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import Logo from '../assets/logo.jpg'

const Navbar = () => {

    const [nav, setNav] = useState(true);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className='flex justify-between items-center px-4 h-24 max-w-[1240px] mx-auto'>
            <img src={Logo} alt="Code gym" />
            <ul className='hidden md:flex'>
                <li className='p-4'>Početna</li>
                <li className='p-4'>O nama</li>
                <li className='p-4'>Prijavi se</li>
                <li className='p-4'>Kontakt</li>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/> }
            </div>
            <div className={!nav ? 'fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
            <img src={Logo} alt="Code gym" />
                <ul className='uppercase p-4'>
                    <li className='p-4 border-b border-gray-600 '>Početna</li>
                    <li className='p-4 border-b border-gray-600'>O nama</li>
                    <li className='p-4 border-b border-gray-600'>Prijavi se</li>
                    <li className='p-4'>Kontakt</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;