import React from 'react';
import Logo from '../../assets/logo.jpg'

const Register = () => {
    return (
        <div class='max-w-[1240] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-5 bg-gray-500'>
	        <div class='max-w-[450px] w-full p-10 bg-white rounded-xl z-10 shadow-xl border'>
            <img src={Logo} alt='Code gym' />
                <div class='text-center'>
			        <h2 class='mt-6 text-3xl font-bold text-gray-900'>Registruj se</h2>
		        </div>
                <form class='mt-8'>
                    <div>
                        <label class='text-sm font-bold text-gray-700'>Ime</label>
                        <input class=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' placeholder='Unesite ime'/>
                    </div>
                    <div className='mt-8'>
                        <label class='text-sm font-bold text-gray-700'>Prezime</label>
                        <input class=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' placeholder='Unesite prezime'/>
                    </div>
                    <div className='mt-8'>
                        <label class='text-sm font-bold text-gray-700'>Telefon</label>
                        <input class=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='text' placeholder='Unesite telefon'/>
                    </div>
                    <div className='mt-8'>
                        <label class='text-sm font-bold text-gray-700'>Email</label>
                        <input class=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='email' placeholder='Unesite email'/>
                    </div>
                    <div class='mt-8'>
                        <label class='text-sm font-bold text-gray-700'>
                            Lozinka
                        </label>
                        <input class='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='password' placeholder='Unesite lozinku'/>
                    </div>
                    <div class='mt-8'>
                        <label class='text-sm font-bold text-gray-700'>
                            Ponovite lozinku
                        </label>
                        <input class='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='password' placeholder='Ponovo unesite lozinku'/>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <button type='submit' class='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                            Registruj se
                        </button>
                    </div>
                    <p class='flex flex-col items-center justify-center text-center text-md text-gray-500'>
				        <span>Imate nalog?</span>
				        <a href='/login' class='text-indigo-500 hover:underline cursor-pointer'>Prijavite se</a>
			        </p>
                </form>
	        </div>
        </div>
    )
}
export default Register;