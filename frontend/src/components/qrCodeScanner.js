import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Footer from './footer';
import Navbar from './navbar';

const QRCodeScanner = () => {
    const [scanResult, setScanResult] = useState('');
    const navigate = useNavigate();


    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleScanWebCam = (result) => {
        console.log("USLOO")
        if(result){
            setScanResult(result.text);
            console.log(result.text);
            console.log("IMA REZULTATA")
            navigate('/user/' + result.text)
        }
        console.log("prosloo")
    }


    return(
        <div>
            <Navbar />
            <div className='p-16 max-w-[1240] flex justify-center items-center bg-gray-500 min-h-screen'>
                <div className='p-8 max-w-[600px] rounded-xl bg-white w-[100vh]'>
                    <div className='mt-10 text-center border-b pb-12'>
                        <h1 className='text-4xl font-medium text-gray-700'>Skeniraj QR kod korisnika</h1>
                    </div>
                    <QrReader 
                        delay={300}
                        style={{width: '100vh'}}
                        onError={handleErrorWebCam}
                        onResult={handleScanWebCam}/>
                    <p>{scanResult}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default QRCodeScanner;