import { Navigate, Outlet } from 'react-router-dom';
import { BoardProvider } from '@context/BoardContext/BoardProvider';
import { useAuthProvider } from '@hooks/useAuthProvider';
import { Spinner } from '@components/';
import { Header } from '@pages/Home/views/';

export const Home = () => {
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

					<BoardProvider>
						<Outlet />
					</BoardProvider>
				</>
			) : (
				<Navigate to='/auth/login' />
			)}
		</>
	);
};
