import React from 'react';
import clientAxios from '../../config/clientAxios';
import { useForm } from '../../hooks';

const formData = {
	name: '',
	email: '',
	password: '',
};

const formValidations = {
	// name: [(value: string) => value.includes('@'), 'Email incorrecto'],
	// email: [(value: string) => value.includes('@'), 'Email incorrecto'],
	// password: [(value: string) => value.length >= 6, 'Name de la carta es negable'],
};

export const Register = () => {
	const { formState, onInputChange, onResetForm } = useForm(formData, formValidations);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/user', formState);
			onResetForm();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='content-login'>
				<form
					action='#'
					className='flex flex-col'
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
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none'
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
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none'
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
							type='text'
							name='password'
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none'
							value={formState.password}
							onChange={onInputChange}
						/>
					</div>

					<button className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 mt-4'>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};
