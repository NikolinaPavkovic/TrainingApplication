import React from 'react';
import {
    FaDribbbleSquare,
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare,
} from 'react-icons/fa'
import Logo from '../assets/logo.jpg'

const Footer = () =>{
    return (
        <div className='max-w-[1240] mx-auto bg-gray-500 py-16 md:px-40 px-4 grid lg:grid-cols-3 gap-8 text-white' id='contact'>
            <div>
                <img src={Logo} alt='/' className='md:w-72'/>
            </div>
            <div className='md:col-span-2'>
                <h1 className='font-bold text-sm'>ŽELIM DA SE PRIJAVIM NA VAŠA EMAIL OBAVEŠTENJA</h1>
                <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                    <input type='email' placeholder='Enter email' className='flex p-3 w-full rounded-md text-black' />
                    <button className='bg-orange-500 rounded-md font-medium w-[200px] ml-3 my-6 px-6 py-3'>Obavesti me</button>
                </div>
                <div className='flex'>
                    <div>
                    <h1 className='w-full text-xl font-bold py-4'>Kontakt</h1>
                    <p>CODE GYM</p>
                    <p>Bulevar Mihajla Pupina 999</p>
                    <p>21000, Novi Sad</p>
                    </div>
                    <div className='py-4 px-6'>
                    <p>Tel. 123-456-7890</p>
                    <p>Email codeGym@gmail.com</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Footer;