import React from 'react';
import { useNavigate } from 'react-router';
import Sign from '../assets/teg.png'

const Cards = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full py-[10rem] px-4 bg-white'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 md:grid-rows-2 gap-8'>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={Sign} alt='/'/>
                    <h2 className='text-3xl font-bold text-center py-8'>CODE 30 GYM</h2>
                    <p className='text-center text-5xl font-bold'>2500 rsd</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b border-t mx-8 mt-8'>Neograničeno korišćenje teretane 30 dana</p>
                        <p className='py-2 border-b mx-8'>Preko 40 kardio sprava</p>
                        <p className='py-2 border-b mx-8'>Uvodni trening</p>
                        <p className='py-2 border-b mx-8'>Savetovanje</p>
                    </div>
                    <button className='bg-orange-500 text-white rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3' onClick={()=>{navigate('/login')}} >Rezerviši paket</button>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={Sign} alt='/'/>
                    <h2 className='text-3xl font-bold text-center py-8'>CODE 30 GRUPNI TRENINZI</h2>
                    <p className='text-center text-5xl font-bold'>2500 rsd</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b border-t mx-8 mt-8'>Neograničeno posećivanje grupnih treninga 30 dana</p>
                        <p className='py-2 border-b mx-8'>Uvodni trening</p>
                        <p className='py-2 border-b mx-8'>Savetovanje</p>
                    </div>
                    <button className='bg-orange-500 text-white rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3' >Rezerviši paket</button>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={Sign} alt='/'/>
                    <h2 className='text-3xl font-bold text-center py-8'>CODE 30 GYM + GRUPNI TRENINZI</h2>
                    <p className='text-center text-5xl font-bold'>3000 rsd</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b border-t mx-8 mt-8'>Neograničeno korišćenje teretane 30 dana</p>
                        <p className='py-2 border-b mx-8'> Neograničeno posećivanje grupnih treninga 30 dana </p>
                        <p className='py-2 border-b mx-8'>Preko 40 kardio sprava</p>
                        <p className='py-2 border-b mx-8'>Uvodni trening</p>
                        <p className='py-2 border-b mx-8'>Savetovanje</p>
                    </div>
                    <button className='bg-orange-500 text-white rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3' >Rezerviši paket</button>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={Sign} alt='/'/>
                    <h2 className='text-3xl font-bold text-center py-8'>CODE 90 GYM</h2>
                    <p className='text-center text-5xl font-bold'>6000 rsd</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b border-t mx-8 mt-8'>Neograničeno korišćenje teretane 90 dana</p>
                        <p className='py-2 border-b mx-8'>Preko 40 kardio sprava</p>
                        <p className='py-2 border-b mx-8'>Uvodni trening</p>
                        <p className='py-2 border-b mx-8'>Savetovanje</p>
                    </div>
                    <button className='bg-orange-500 text-white rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3' >Rezerviši paket</button>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={Sign} alt='/'/>
                    <h2 className='text-3xl font-bold text-center py-8'>CODE 90 GRUPNI TRENINZI</h2>
                    <p className='text-center text-5xl font-bold'>6000 rsd</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b border-t mx-8 mt-8'>Neograničeno posećivanje grupnih treninga 90 dana</p>
                        <p className='py-2 border-b mx-8'>Uvodni trening</p>
                        <p className='py-2 border-b mx-8'>Savetovanje</p>
                    </div>
                    <button className='bg-orange-500 text-white rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3' >Rezerviši paket</button>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem]' src={Sign} alt='/'/>
                    <h2 className='text-3xl font-bold text-center py-8'>CODE 90 GYM + GRUPNI TRENINZI</h2>
                    <p className='text-center text-5xl font-bold'>7500 rsd</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b border-t mx-8 mt-8'>Neograničeno korišćenje teretane 90 dana</p>
                        <p className='py-2 border-b mx-8'> Neograničeno posećivanje grupnih treninga 90 dana </p>
                        <p className='py-2 border-b mx-8'>Preko 40 kardio sprava</p>
                        <p className='py-2 border-b mx-8'>Uvodni trening</p>
                        <p className='py-2 border-b mx-8'>Savetovanje</p>
                    </div>
                    <button className='bg-orange-500 text-white rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3' >Rezerviši paket</button>
                </div>

            </div>
        </div>
    )
}
export default Cards;