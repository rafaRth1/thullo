import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { Logo } from '@components/';
import { clientAxios, colors } from '@utils/';

const color = Math.floor(Math.random() * colors.length);

export const Register = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState({
		name: '',
		email: '',
		password: '',
		colorImg: colors[color].color,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/user', value);
			navigate('/');
		} catch (error) {
			// console.log(error);
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
					<Input
						type='text'
						name='name'
						label='Nombre'
						className='mb-4'
						classNames={{ inputWrapper: 'bg-[#1d2021] hover:bg-red-600' }}
						value={value.name}
						onValueChange={(e) => setValue({ ...value, name: e })}
					/>

					<Input
						type='email'
						name='email'
						label='Correo electronico'
						className='mb-4'
						classNames={{ inputWrapper: 'bg-[#1d2021] hover:bg-red-600' }}
						value={value.email}
						onValueChange={(e) => setValue({ ...value, email: e })}
					/>

					<Input
						type='password'
						name='password'
						label='Contraseña'
						className='mb-4'
						classNames={{ inputWrapper: 'bg-[#1d2021] hover:bg-red-600' }}
						value={value.password}
						onValueChange={(e) => setValue({ ...value, password: e })}
					/>

					<Button
						color='primary'
						type='submit'>
						Registrarse
					</Button>

					<div className='mt-10'>
						<Link
							to='/auth/login'
							className='text-white text-base block font-light text-center hover:underline transition-all'>
							¿Ya tiene una cuenta?, Inicie Sesión
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
