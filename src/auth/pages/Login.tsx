import { useEffect, useState } from 'react';
import clientAxios from '../../utils/clientAxios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alerta, Logo } from '../../components';
import { useAuthProvider } from '../../hooks/useAuthProvider';
import { useAppDispatch } from '@hooks/useRedux';
import { projectApi } from '@redux/home/apis';

export const Login = () => {
	const [valueSession, setValueSession] = useState({ email: '', password: '' });
	const [alerta, setAlerta] = useState({ msg: '', error: false });
	const { setAuth } = useAuthProvider();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/user/login', valueSession);

			// const response = await fetch('http://localhost:4000/user/login', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify(valueSession),
			// });

			// const data = await response.json();

			// console.log(data);

			localStorage.setItem('token', data.token);
			setAuth(data);
			navigate('/');
		} catch (error: any) {
			console.log(error);
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
					<div className='mb-5'>
						<label
							htmlFor='email'
							className='text-white block'>
							Email:
						</label>
						<input
							id='email'
							type='text'
							autoComplete='username'
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none w-full'
							value={valueSession.email}
							onChange={(e) => setValueSession({ ...valueSession, email: e.target.value })}
						/>
					</div>
					<div className='mb-5'>
						<label
							htmlFor='pass'
							className='text-white block'>
							Password:
						</label>
						<input
							id='pass'
							type='password'
							name='pass'
							autoComplete='current-password'
							className='bg-neutral-300 text-gray-500 px-3 py-2 rounded-xl outline-none w-full'
							value={valueSession.password}
							onChange={(e) => setValueSession({ ...valueSession, password: e.target.value })}
						/>
					</div>
					<button
						type='submit'
						className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700'>
						Login
					</button>
					<div className='mt-10'>
						{/* <Link
							to='/auth/forget-password'
							className='text-white text-base block font-light text-center hover:underline'>
							¿No puedes iniciar Sesión?
						</Link> */}
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
