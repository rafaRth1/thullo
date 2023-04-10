import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alerta, Logo } from '../../components';
import clientAxios from '../../config/clientAxios';
import { useForm } from '../../hooks';
import { useAuthProvider } from '../../hooks/useAuthProvider';

const formData = {
	email: '',
	password: '',
};

const formValidations = {
	// email: [(value: string) => value.includes('@'), 'Email incorrecto'],
	// password: [(value: string) => value.length >= 6, 'Name de la carta es negable'],
};

export const Login = () => {
	const { formState, onInputChange } = useForm(formData, formValidations);
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const { setAuth } = useAuthProvider();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/user/login', formState);
			localStorage.setItem('token', data.token);
			setAuth(data);
		} catch (error: any) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alerta;

	return (
		<div className='flex-1 w-full h-full flex justify-center items-center flex-col my-auto'>
			{msg && <Alerta alerta={alerta} />}

			<div className='mt-10 mb-10 mx-auto'>
				<Logo width={300} />
			</div>

			<section className='content-login w-full'>
				<form
					style={{ maxWidth: '400px' }}
					className='flex flex-col mx-auto p-5'
					onSubmit={handleSubmit}>
					<h1 className='text-white font-medium text-2xl text-center mb-10'>Iniciar sesión en Thullo</h1>

					<div className='mb-5'>
						<label
							htmlFor='email'
							className='text-white block'>
							Email:
						</label>
						<input
							type='text'
							name='email'
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none w-full'
							value={formState.email}
							onChange={onInputChange}
						/>
					</div>

					<div className='mb-5'>
						<label
							htmlFor='password'
							className='text-white block'>
							Password:
						</label>
						<input
							type='password'
							name='password'
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none w-full'
							value={formState.password}
							onChange={onInputChange}
						/>
					</div>

					<button className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700'>Login</button>

					<div className='mt-10'>
						<Link
							to='/auth/forget-password'
							className='text-white text-base block font-light text-center hover:underline'>
							¿No puedes iniciar Sesión?
						</Link>
						<Link
							to='/auth/register'
							className='text-white text-base block font-light text-center hover:underline'>
							¿No tiene una cuenta?, Registrese
						</Link>
					</div>
				</form>
			</section>
		</div>
	);
};
