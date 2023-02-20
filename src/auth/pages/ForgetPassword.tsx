import { useState } from 'react';
import { Alerta } from '../../components';
import clientAxios from '../../config/clientAxios';

export const ForgetPassword = (): JSX.Element => {
	const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({ msg: '', error: false });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/user/forget-password', { email });

			console.log(data);

			// setAlerta({
			// 	msg: data.msg,
			// 	error: false,
			// });

			// setEmail('');
		} catch (error: any) {
			console.log(error);
		}
	};

	const { msg } = alerta;

	return (
		<div>
			<h1 className='text-blue-600 text-5xl capitalize'>
				Recupera tu acceso y no pierdas tus proyectos <span className='text-white'>proyectos</span>
			</h1>

			<div>{msg && <Alerta alerta={alerta} />}</div>

			<form onSubmit={handleSubmit}>
				<div className='my-5'>
					<label className='block text-white'>Email:</label>
					<input
						type='email'
						placeholder='Correo'
						className='py-1 px-3 outline-none bg-neutral-300 text-gray-500'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<button className='text-center bg-blue-500 rounded-xl text-lg text-white py-1 px-3 w-full'>
					Enviar Intrucciones
				</button>
			</form>
		</div>
	);
};
