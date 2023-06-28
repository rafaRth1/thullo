import { Navigate, Outlet } from 'react-router-dom';
import { useAuthProvider } from '../../hooks/useAuthProvider';
import { Header } from '../../views';
import { Spinner } from '../../components';

export const TrelloLayout = (): JSX.Element => {
	const { auth, loading } = useAuthProvider();

	if (loading)
		return (
			<>
				<Spinner className='h-40' />
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
