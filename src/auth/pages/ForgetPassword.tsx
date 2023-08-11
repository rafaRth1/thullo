import { useState } from 'react';
import { Alerta, Logo } from '../../components';
import clientAxios from '../../utils/clientAxios';

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
		<div className='flex-1 w-full h-full flex justify-center items-center flex-col my-auto'>
			<div className='mt-10 mb-10 mx-auto'>
				<Logo width={300} />
			</div>

			<div className='content-forget-password w-full'>
				<form
					onSubmit={handleSubmit}
					style={{ maxWidth: '400px' }}
					className='flex flex-col mx-auto'>
					<h1 className='text-blue-600 text-4xl capitalize font-medium text-center'>
						Recupera tu acceso y no pierdas tus <span className='text-white'>proyectos</span>
					</h1>

					<div>{msg && <Alerta alerta={alerta} />}</div>

					<div className='my-5'>
						<label className='block text-white'>Email:</label>
						<input
							type='email'
							placeholder='Correo'
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none w-full'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<button className='text-center bg-blue-500 hover:bg-blue-700 rounded-xl text-lg text-white py-1 px-3 w-full'>
						Enviar Intrucciones
					</button>
				</form>
			</div>
		</div>
	);
};
