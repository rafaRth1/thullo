import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout = () => {
	return (
		<>
			{/* <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'> */}
			<main className='flex-1'>
				<div className='h-screen'>
					<Outlet />
				</div>
			</main>
		</>
	);
};
