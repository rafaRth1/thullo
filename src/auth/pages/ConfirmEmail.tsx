import clientAxios from '../../config/clientAxios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alerta } from '../../components';
import axios from 'axios';

export const ConfirmEmail = () => {
	const [alerta, setAlerta] = useState<any>({});
	const [accountConfirm, setAccountConfirm] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const cancelToken = axios.CancelToken.source();

		const handleUserConfirm = async () => {
			try {
				const { data } = await clientAxios.get(`/user/confirm/${id}`, { cancelToken: cancelToken.token });
				setAlerta({
					msg: data.msg,
					error: false,
				});

				setAccountConfirm(true);
			} catch (error: any) {
				if (axios.isCancel(error)) {
					console.log('Cancelled');
				}

				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}

			return () => {
				cancelToken.cancel();
			};
		};

		handleUserConfirm();
	}, []);

	const { msg } = alerta;

	return (
		<div className='flex-1 w-full h-full flex justify-center items-center flex-col my-auto'>
			<div className='content-confirm-email w-full'>
				<div
					className='flex flex-col mx-auto p-5'
					style={{ maxWidth: '400px' }}>
					<h1 className='text-blue-600 text-5xl font-medium capitalize text-center'>
						Confirma tu cuenta y comienza a crear <span className='text-white'>proyectos</span>
					</h1>

					<div>
						{msg && <Alerta alerta={alerta} />}
						{!accountConfirm && (
							<div className='mt-10'>
								<Link
									to='/auth/register'
									className='text-white text-3xl block font-light text-center hover:underline'>
									Inicie Sesión
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
