import { Navigate, Outlet } from 'react-router-dom';
import { useAuthProvider } from '../../hooks/useAuthProvider';
import { Header } from '../../views';

export const TrelloLayout = (): JSX.Element => {
	const { auth, loading } = useAuthProvider();

	if (loading)
		return (
			<>
				<p>Cargando...</p>
			</>
		);

	return (
		<>
			{auth?._id ? (
				<>
					<Header />
					<Outlet />
				</>
			) : (
				<Navigate to='/auth/login' />
			)}
		</>
	);
};
