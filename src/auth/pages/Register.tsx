import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components';
import clientAxios from '../../utils/clientAxios';
import { useForm } from '../../hooks';
import { pickColors } from '../../utils/pickColor';

const color = Math.floor(Math.random() * pickColors.length);

const formData = {
	name: '',
	email: '',
	password: '',
	colorImg: pickColors[color].color,
};

const formValidations = {
	// name: [(value: string) => value.includes('@'), 'Email incorrecto'],
	// email: [(value: string) => value.includes('@'), 'Email incorrecto'],
	// password: [(value: string) => value.length >= 6, 'Name de la carta es negable'],
};

export const Register = () => {
	const { formState, onInputChange, onResetForm } = useForm(formData, formValidations);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/user', formState);
			onResetForm();
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex-1 w-full h-full flex flex-col justify-center items-center'>
			<div className='mt-10 mb-10 mx-auto'>
				<Logo width={300} />
			</div>

			<div className='content-login w-full'>
				<form
					style={{ maxWidth: '400px' }}
					className='flex flex-col mx-auto'
					onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='name'
							className='text-white block'>
							Name:
						</label>
						<input
							type='text'
							name='name'
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none w-full'
							value={formState.name}
							onChange={onInputChange}
						/>
					</div>

					<div className='mb-4'>
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

					<div className='mb-4'>
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

					<button className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 mt-4'>Register</button>

					<div className='mt-10'>
						<Link
							to='/auth/login'
							className='text-white text-base block font-light text-center hover:underline'>
							¿Ya tiene una cuenta?, Inicie Sesión
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
