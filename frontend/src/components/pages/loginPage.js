import React from 'react';
import Logo from '../../assets/logo.jpg'

const Login = () => {
    return(
        <div className='max-w-[1240] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-500'>
	        <div className='max-w-[450px] w-full p-10 bg-white rounded-xl z-10 shadow-xl border'>
            <img src={Logo} alt='Code gym' />
                <div className='text-center'>
			        <h2 className='mt-6 text-3xl font-bold text-gray-900'>Dobrodošli nazad!</h2>
			        <p className='mt-2 text-sm text-gray-600'>Prijavite se na Vaš nalog</p>
		        </div>
                <form className='mt-8'>
                    <div>
                        <label className='text-sm font-bold text-gray-700'>Email</label>
                        <input className=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='' placeholder='Unesite email'/>
                    </div>
                    <div className='mt-8'>
                        <label className='text-sm font-bold text-gray-700'>
                            Lozinka
                        </label>
                        <input className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='' placeholder='Unesite lozinku'/>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <button type='submit' className='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                            Prijavi se
                        </button>
                    </div>
                    <p className='flex flex-col items-center justify-center text-center text-md text-gray-500'>
				        <span>Još uvek nemate nalog?</span>
				        <a href='/register' className='text-indigo-500 hover:underline cursor-pointer'>Registrujte se</a>
			        </p>
                </form>
	        </div>
        </div>
    )
}
export default Login;