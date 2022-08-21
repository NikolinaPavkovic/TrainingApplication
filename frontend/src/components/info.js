import React from 'react';
import Vezba from '../assets/img1.jpg'

const Info = () => {
    return (
        <div className='w-full bg-gray-500 py-16 px-4' id='about'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img className='p-4' src={Vezba} alt='/' />
                <div className='flex flex-col justify-center p-2 gap-2'>
                    <p className='font-bold text-white uppercase'>O nama</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold'>Naša vizija</h1>
                    <p className='text-white'>
                    Naša vizija je biti najbolji u svim segmentima koje jedan fitnes centar može da ponudi.
                    Ne pristajemo na manje od najboljeg jer nam višegodišnje iskustvo u fitnesu i menadžmentu 
                    to ne dozvoljava.
                    </p>
                    <p className='text-white'>
                    Želimo da vam omogućimo vrhunske uslove za vežbanje kao i okruženje u kojem ćete se osećeti 
                    prijatno i ispunjeno.
                    </p>
                    <p className='text-white'>
                    Sigurni smo da će jedan dolazak u No Limit Gym ostaviti najbolji prvi utisak 
                    i podići vaša očekivanja na najviši nivo.
                    </p>
                    <button className='bg-orange-500 w-[200px] rounded-md font-medium my-3 mx-auto md:mx-0 py-3 text-white'>Postani član</button>
                </div>
            </div>
        </div>
    )
}
export default Info;