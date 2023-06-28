import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImageProfile, LabelElement, Logo } from '../../components';
import { useProvider, useAuthProvider } from '../../hooks';
import { IoApps, IoArrowDownOutline } from 'react-icons/io5';

export const Header = (): JSX.Element => {
	const [openSession, setOpenSession] = useState(false);
	const { auth, setAuth } = useAuthProvider();
	const { project, setProject, setLists } = useProvider();
	const navigate = useNavigate();
	const location = useLocation();

	const handleNavigationProfile = () => {
		navigate(`/profile/${auth._id}`);
		setOpenSession(false);
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
		setProject({ _id: '', name: '', description: '', collaborators: [], creator: '', type: '' });
		setLists({ lists: [] });
	};

	return (
		<header>
			<div className='border-b-neutral-700 flex items-center border-b mx-auto p-4'>
				<Link
					to='/board'
					onClick={handleResetProject}>
					<Logo
						width={100}
						height={30}
					/>
				</Link>

				{location.pathname !== '/' && (
					<>
						<div className='px-2 border-r-2 border-neutral-700'>
							<span className='text-white font-medium capitalize'>{project.name}</span>
						</div>

						<Link
							to='/board'
							onClick={handleResetProject}>
							<LabelElement
								label='All Board'
								classname='bg-neutral-700 mx-3'>
								<IoApps
									className='text-neutral-200'
									size={15}
								/>
							</LabelElement>
						</Link>
					</>
				)}

				<div className='mr-10 flex justify-end flex-1 w-full'>
					<input
						type='text'
						placeholder='Keyword...'
						name='search'
						className='bg-neutral-700 text-white focus-visible:outline-0 rounded-md py-1 px-3 mr-2'
					/>
					<button className='bg-blue-600 text-white py-2 px-4 rounded-md text-xs'>Search</button>
				</div>

				<div className='relative'>
					<div
						className='user-session flex items-center cursor-pointer'
						onClick={() => setOpenSession(!openSession)}>
						<ImageProfile
							name={auth.name}
							color={auth.colorImg}
						/>
					</div>

					<div
						className={`border-neutral-600 bg-neutral-800 absolute top-11 right-0 flex flex-col border rounded-mdl transition-opacity p-1 z-40 w-24 ${
							openSession ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
						}`}>
						{/* <span
							className='text-white p-2 hover:bg-neutral-600 rounded cursor-pointer'
							onClick={handleNavigationProfile}>
							Profilez
						</span> */}
						<span
							className='text-white hover:bg-red-600 transition-colors cursor-pointer p-2 rounded'
							onClick={handleLogout}>
							Logout
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};
