import { useParams } from 'react-router-dom';
import { useAuthProvider, useProvider } from '../hooks';

export const Profile = () => {
	const { id } = useParams();
	const { auth } = useAuthProvider();
	console.log(auth);

	return <div>Profile</div>;
};
