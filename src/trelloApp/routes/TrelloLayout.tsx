import { Navigate, Outlet } from 'react-router-dom';
import { useProvider } from '../../hooks';
import { useAuthProvider } from '../../hooks/useAuthProvider';
import { Header } from '../../views';
import { AlertHigh } from '../../components/AlertHigh';

export const TrelloLayout = () => {
	const { auth, loading } = useAuthProvider();
	const { alertHigh } = useProvider();

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
					<AlertHigh alertHigh={alertHigh} />
					<Outlet />
				</>
			) : (
				<Navigate to='/auth/login' />
			)}
		</>
	);
};
