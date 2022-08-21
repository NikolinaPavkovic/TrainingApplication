import React, {useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import Logo from '../assets/logo.jpg'
import {Link as Link1} from 'react-scroll'
import {Link as Link2} from 'react-router-dom'

const Navbar = () => {

    const [nav, setNav] = useState(true);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className='flex justify-between items-center px-4 h-24 max-w-[1240px] mx-auto'>
            <img src={Logo} alt="Code gym" />
            <ul className='hidden md:flex'>
                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link1 activeClass='active' to='home' spy={true} smooth={true}>Početna </Link1></li>
                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link1 to='about' spy={true} smooth={true}> O nama </Link1></li>
                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link2 to='/login'> Prijavi se </Link2></li>
                <li className='p-4 hover:scale-110 hover:cursor-pointer'> <Link1 to='contact' spy={true} smooth={true}>Kontakt </Link1></li>
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