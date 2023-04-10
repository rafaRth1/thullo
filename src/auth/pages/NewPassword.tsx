import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alerta, Logo } from '../../components';
import clientAxios from '../../config/clientAxios';

export const NewPassword = () => {
	const [password, setPassword] = useState('');
	const [passwordModified, setPasswordModified] = useState(false);
	const [tokenValido, setTokenValido] = useState(false);
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const { token } = useParams();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password.length < 6) {
			setAlerta({
				msg: 'El password debe ser mínimo 6 caracteres',
				error: true,
			});
			return;
		}

		try {
			const { data } = await clientAxios.post(`/user/forget-password/${token}`, { password });

			setAlerta({
				msg: data.msg,
				error: false,
			});

			setPasswordModified(true);
		} catch (error: any) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	useEffect(() => {
		const checkToken = async () => {
			try {
				const { data } = await clientAxios.get(`/user/forget-password/${token}`);

				setTokenValido(true);

				setAlerta({
					msg: data.msg,
					error: false,
				});

				setPassword('');
			} catch (error: any) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});

				console.log(error);
			}
		};
		checkToken();

		return () => {
			console.log('Limpiando');
		};
	}, []);

	const { msg } = alerta;

	return (
		<div className='flex-1 w-full h-full flex justify-center items-center flex-col my-auto'>
			<div className='mt-10 mb-10 mx-auto'>
				<Logo width={300} />
			</div>

			<div className='content-new-password w-full p-5'>
				<div
					className='flex flex-col mx-auto'
					style={{ maxWidth: '400px' }}>
					<h1 className='text-blue-600 text-4xl capitalize font-medium'>
						Reestablece tu password y no pierdas tus <span className='text-white'>proyectos</span>
					</h1>

					<div>{msg && <Alerta alerta={alerta} />}</div>

					{tokenValido && (
						<form onSubmit={handleSubmit}>
							<div className='my-5'>
								<label className='block text-white mb-2'>New Password:</label>
								<input
									type='password'
									placeholder='Nueva contraseña'
									className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none w-full'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<button className='text-center bg-blue-500 hover:bg-blue-700 rounded-xl text-lg text-white py-1 px-3 w-full'>
								Guardar Nueva Contraseña
							</button>
						</form>
					)}

					{passwordModified && (
						<div className='mt-5'>
							<Link
								to='/auth/login'
								className='text-white text-base block font-light text-center hover:underline'>
								Inicie Sesión
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
