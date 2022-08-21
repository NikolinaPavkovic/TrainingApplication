import React from 'react';

const Login = () => {
    return(
        <div class='max-w-[1240] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8'>
	        <div class='max-w-[450px] w-full p-10 bg-white rounded-xl z-10 shadow-xl border'>
		        <div class='text-center'>
			        <h2 class='mt-6 text-3xl font-bold text-gray-900'>Dobrodošli nazad!</h2>
			        <p class='mt-2 text-sm text-gray-600'>Prijavite se na Vaš nalog</p>
		        </div>
                <form class='mt-8'>
                    <div>
                        <label class='text-sm font-bold text-gray-700'>Email</label>
                        <input class=' w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='' placeholder='Unesite email'/>
                    </div>
                    <div class='mt-8'>
                        <label class='text-sm font-bold text-gray-700'>
                            Lozinka
                        </label>
                        <input class='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-orange-500' type='' placeholder='Unesite lozinku'/>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <button type='submit' class='bg-orange-500 w-[200px] rounded-md font-medium my-3 py-3 text-white'>
                            Prijavi se
                        </button>
                    </div>
                    <p class='flex flex-col items-center justify-center text-center text-md text-gray-500'>
				        <span>Još uvek nemate nalog?</span>
				        <a href='/register' class='text-indigo-500 hover:underline cursor-pointer'>Registrujte se</a>
			        </p>
                </form>
	        </div>
        </div>
    )
}
export default Login;