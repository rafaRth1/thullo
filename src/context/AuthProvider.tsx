import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import clientAxios from '../config/clientAxios';

interface Props {
	children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
	const [auth, setAuth] = useState<any>({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const authtenticateUser = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				setLoading(false);
				return;
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const { data } = await clientAxios('/user/perfil', config);
				setAuth(data);
				// navigate('/');
			} catch (error) {
				setAuth({});
			} finally {
				setLoading(false);
			}
		};

		authtenticateUser();
	}, []);

	return <AuthContext.Provider value={{ auth, setAuth, loading }}>{children}</AuthContext.Provider>;
};
