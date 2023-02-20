import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alerta } from '../../components';
import clientAxios from '../../config/clientAxios';

export const ConfirmEmail = () => {
	const [alerta, setAlerta] = useState<any>({});
	const [accountConfirm, setAccountConfirm] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const handleUserConfirm = async () => {
			try {
				const { data } = await clientAxios.get(`/user/confirm/${id}`);
				setAlerta({
					msg: data.msg,
					error: false,
				});

				setAccountConfirm(true);
			} catch (error: any) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};

		handleUserConfirm();
	}, []);

	const { msg } = alerta;

	return (
		<div>
			<h1 className='text-blue-600 text-5xl capitalize'>
				Confirma tu cuenta y comienza a crear <span className='text-white'>proyectos</span>
			</h1>

			<div>
				{msg && <Alerta alerta={alerta} />}
				{accountConfirm && (
					<Link
						className='text-white text-1xl underline'
						to='/auth/register'>
						Inicia Sesión
					</Link>
				)}
			</div>
		</div>
	);
};
