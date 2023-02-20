import { useState } from 'react';
import { Alerta } from '../../components';
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
		<div className='w-full h-full flex justify-center items-center flex-col'>
			{msg && <Alerta alerta={alerta} />}

			<div className='content-login'>
				<form
					className='flex flex-col'
					onSubmit={handleSubmit}>
					<div className='mb-5'>
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

					<div className='mb-5'>
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

					<button className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700'>Login</button>
				</form>
			</div>
		</div>
	);
};
