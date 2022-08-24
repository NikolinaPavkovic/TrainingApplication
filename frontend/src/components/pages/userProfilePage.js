import React, { useEffect, useState } from 'react';
import QR from '../../assets/qr.png';
import {AiOutlineEdit} from 'react-icons/ai';
import Logo from '../../assets/logo.jpg'
import QRCode from 'qrcode';

const UserProfile = () => {
    const [isEditting, setIsEdditing] = useState(false);
    const [codeText, setCodeText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setCodeText('pavkovicn@hotmail.com');
        generateQrCode();
    }, [codeText])

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(codeText);
            setImageUrl(response);
        } catch (error) {
            
        }
    }

    const editProfile = () => {
        setIsEdditing(!isEditting);
    }

    const handleEdit = () => {
        setIsEdditing(false);
    }

    return (
        <div >
            {!isEditting ? <div className='p-16 max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow max-w-[600px] rounded-xl'>
                    <AiOutlineEdit size={30} onClick={editProfile}/>
                    <div className='mt-10 text-center border-b pb-12'>
                        <h1 className='text-4xl font-medium text-gray-700'>Nikolina Pavković</h1>
                        <p className='font-light text-gray-600 mt-3'>Novi Sad, Srbija</p>
                        <p className='mt-8 text-orange-500 font-bold'>CLANARINA</p>
                        <p className='mt-8 text-gray-500'>pavkovicn@hotmail.com</p>
                        <p className='text-gray-500'>0658886407</p>
                    </div>
                    <div className='mt-12 flex flex-col justify-center'>
                        <img src={imageUrl} alt='/' />
                    </div>
                </div>
            </div> :
            <div className='max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 bg-white shadow max-w-[600px] rounded-xl'>
                <img src={Logo} alt='Code gym' />
                    <div className='mt-10 text-center border-b pb-12 grid grid-cols-3'>
                        <p className='text-left font-light text-gray-600 mt-3'>Ime</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'Nikolina'}/>
                        <p className='text-left font-light text-gray-600 mt-3'>Prezime</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'Pavkovic'}/>
                        <p className='text-left font-light text-gray-600 mt-3'>Email</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'pavkovicn@hotmail.com'}/>
                        <p className='text-left font-light text-gray-600 mt-3'>Telefon</p>
                        <input className='col-span-2 w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' value={'0658886407'}/>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <button onClick={handleEdit} className='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                            OK
                        </button>
                        <button onClick={editProfile} className='w-[200px] rounded-md font-medium py-3 text-gray-500 border'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}

        </div>
    )
}
export default UserProfile;