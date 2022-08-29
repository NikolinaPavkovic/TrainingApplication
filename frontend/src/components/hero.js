import React from 'react';
import { useNavigate } from 'react-router';
import Typed from 'react-typed';

const Hero = () => {
    const navigate = useNavigate();

    return(
        <div id='home'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen text-center mx-auto flex flex-col justify-center'>
                <p className='text-orange-600 font-bold p-4 uppercase'>Najsavremenija teretana u gradu</p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Tvoj prvi korak ka zdravom načinu života.</h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Trenirajte</p>
                    <Typed
                    className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-gray-500'
                    strings={['u grupi', 'samostalno']}
                    typeSpeed={120}
                    backSpeed={140}
                    loop
                    />
                </div>
                <p className='md:text-2xl text-xl font-bold text-gray-500'>
                Nudimo veliki broj paketa da možete pronaći paket koji odgovara baš vašim potrebama.
                </p>
                <button className='bg-orange-400 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white' onClick={()=> {navigate('/register')}}>Postani član</button>
            </div>
        </div>
    )
}
export default Hero;