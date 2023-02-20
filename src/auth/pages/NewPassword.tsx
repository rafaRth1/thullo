import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alerta } from '../../components';
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
	}, []);

	const { msg } = alerta;

	return (
		<div>
			<h1 className='text-blue-600 text-5xl capitalize'>
				Reestablece tu password y no pierdas tus proyectos <span className='text-white'>proyectos</span>
			</h1>

			<div>{msg && <Alerta alerta={alerta} />}</div>

			{tokenValido && (
				<form onSubmit={handleSubmit}>
					<div className='my-5'>
						<label className='block text-white'>New Password:</label>
						<input
							type='password'
							placeholder='Nueva contraseña'
							className='py-1 px-3 outline-none bg-neutral-300 text-gray-500'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button className='text-center bg-blue-500 rounded-xl text-lg text-white py-1 px-3 w-full'>
						Guardar Nueva Contraseñ<a href=''></a>
					</button>
				</form>
			)}

			{passwordModified && (
				<Link
					className='text-white text-1xl underline'
					to='/auth/register'>
					Inicia Sesión
				</Link>
			)}
		</div>
	);
};
