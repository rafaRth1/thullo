import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@components/';
import { AppProvider } from '@context/';
import { useAuthProvider } from '@hooks/use-auth-provider';
import { Header, SubHeader } from '@pages/home/views';

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
					<AppProvider>
						<Header />
						<SubHeader />
						<Outlet />
					</AppProvider>
				</>
			) : (
				<Navigate to='/auth/login' />
			)}
		</>
	);
};
