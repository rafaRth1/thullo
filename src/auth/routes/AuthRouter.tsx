import { Navigate, Route, Routes } from 'react-router-dom';
import { ConfirmEmail, ForgetPassword, Login, NewPassword, Register } from '../pages';
import { AuthLayout } from './AuthLayout';

export const AuthRouter = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<AuthLayout />}>
				<Route
					path='/login'
					element={<Login />}
				/>

				<Route
					path='/register'
					element={<Register />}
				/>

				<Route
					path='/confirm/:id'
					element={<ConfirmEmail />}
				/>

				<Route
					path='/forget-password'
					element={<ForgetPassword />}
				/>

				<Route
					path='/forget-password/:token'
					element={<NewPassword />}
				/>
			</Route>

			<Route
				path='/*'
				element={<Navigate to='/auth/login' />}
			/>
		</Routes>
	);
};
