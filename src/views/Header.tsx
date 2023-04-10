import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageProfile, LabelElement, Logo } from '../components';
import { useAuthProvider } from '../hooks/useAuthProvider';
import { useProvider } from '../hooks';
import { IoApps, IoArrowDownOutline } from 'react-icons/io5';

export const Header = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { auth, setAuth } = useAuthProvider();
	const { project, setProject, setLists } = useProvider();

	const handleNavigationProfile = () => {
		navigate(`/profile/${auth._id}`);
		setOpen(false);
	};

	const handleLogout = () => {
		setAuth({
			_id: '',
			name: '',
			email: '',
			confirm: false,
			colorImg: '',
		});
		localStorage.setItem('token', '');
	};

	const handleResetProject = () => {
		setProject({ _id: '', name: '', description: '', collaborators: [] });
		setLists({ lists: [] });
	};

	return (
		<header className='h-auto'>
			<div className='header-top contenedor-header mx-auto flex items-center border-b-neutral-700 border-b'>
				<Link
					to='/board'
					onClick={handleResetProject}>
					<Logo />
				</Link>

				<div className='px-2 border-r-2 border-neutral-700'>
					<span className='text-white font-medium capitalize'>{project.name}</span>
				</div>

				<Link
					to='/board'
					onClick={handleResetProject}>
					<LabelElement
						label='All Board'
						classname='bg-neutral-700'>
						<IoApps className='text-neutral-200' />
					</LabelElement>
				</Link>

				<div className='search-keyword relative mr-10 flex justify-end flex-1 w-full'>
					<input
						type='text'
						placeholder='Keyword...'
						className='rounded-md py-1 px-3 bg-neutral-700 text-white'
					/>
					<button className='bg-blue-600 text-white py-2 px-4 rounded-md text-xs'>Search</button>
				</div>

				<div className='relative'>
					<div
						className='user-session flex items-center cursor-pointer'
						onClick={() => setOpen(!open)}>
						<ImageProfile
							name={auth.name}
							color={auth.colorImg}
						/>
						<span className='text-white'>{auth.name}</span>

						<IoArrowDownOutline className='ml-1 text-white' />
					</div>

					<div
						className={`absolute top-11 flex flex-col p-1 z-40 border border-neutral-600 rounded-md w-full transition-opacity bg-neutral-800 ${
							open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
						}`}>
						{/* <span
							className='text-white p-2 hover:bg-neutral-600 rounded cursor-pointer'
							onClick={handleNavigationProfile}>
							Profile
						</span> */}
						<span
							className='text-white p-2 hover:bg-red-600 rounded cursor-pointer'
							onClick={handleLogout}>
							Logout
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};
