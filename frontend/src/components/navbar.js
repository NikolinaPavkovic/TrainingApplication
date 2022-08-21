import React, {useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {

    const [nav, setNav] = useState(true);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className='flex justify-between items-center px-4 h-24 max-w-[1240px] mx-auto'>
            <img src="./images/logo.jpg" alt="Code gym" />
            <h1 className='w-full text-3xl font-bold text-[#19700f]'>CODE GYM</h1>
            <ul className='hidden md:flex'>
                <li className='p-4'>Home</li>
                <li className='p-4'>About</li>
                <li className='p-4'>Login</li>
                <li className='p-4'>Contact</li>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/> }
            </div>
            <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#19700f] m-4'>CODE GYM</h1>
                <ul className='uppercase p-4'>
                    <li className='p-4 border-b border-gray-600 '>Home</li>
                    <li className='p-4 border-b border-gray-600'>About</li>
                    <li className='p-4 border-b border-gray-600'>Login</li>
                    <li className='p-4'>Contact</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;