import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthProvider, useAppDispatch } from '@hooks/';
import { Alerta, Logo } from '@components/';
import { clientAxios } from '@utils/';
import { projectApi } from '@redux/home/apis';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

export const Login = () => {
	const [valueSession, setValueSession] = useState({ email: 'user1@correo.com', password: '123456' });
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const { setAuth } = useAuthProvider();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/user/login', valueSession);

			localStorage.setItem('token', data.token);

			setAuth(data);
			navigate('/');
		} catch (error: any) {
			// console.log(error);
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alerta;

	useEffect(() => {
		if (location.pathname === '/auth/login') {
			dispatch(projectApi.util.resetApiState());
		}
	}, []);

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

					<Input
						type='email'
						label='Correo Electronico'
						className='mb-5'
						classNames={{ inputWrapper: 'bg-[#1d2021] hover:bg-red-600' }}
						value={valueSession.email}
						onChange={(e) => setValueSession({ ...valueSession, email: e.target.value })}
					/>

					<Input
						type='password'
						label='Contraseña'
						className='mb-5'
						classNames={{ inputWrapper: 'bg-[#1d2021]' }}
						value={valueSession.password}
						onChange={(e) => setValueSession({ ...valueSession, password: e.target.value })}
					/>

					<Button
						color='primary'
						type='submit'>
						Iniciar Sesión
					</Button>
					<div className='mt-10'>
						{/* <Link
							to='/auth/forget-password'
							className='text-white text-base block font-light text-center hover:underline'>
							¿No puedes iniciar Sesión?
						</Link> */}
						<Link
							to='/auth/register'
							className='text-white text-base block font-medium text-center hover:underline'>
							¿No tiene una cuenta? Registrese
						</Link>
					</div>
				</form>
			</section>
		</div>
	);
};
