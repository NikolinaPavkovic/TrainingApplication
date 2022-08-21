import React from 'react';

const Newsletter = () => {
    return (
        <div className='w-full py-16 text-white bg-black px-4'>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-2'>
                <div >
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Želite da budete u toku sa našim ponudama?</h1>
                    <p>Unesite Vaš email i budite uvek obavešteni.</p>
                </div>
                <div className='my-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                        <input type='email' placeholder='Enter email' className='flex p-3 w-full rounded-md text-black' />
                        <button className='bg-orange-500 rounded-md font-medium w-[200px] ml-3 my-6 px-6 py-3'>Obavesti me</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Newsletter;