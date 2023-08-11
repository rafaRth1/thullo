import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthProvider } from '@hooks/';
import { ImageProfile, LabelElement, Logo } from '@components/';
import { Search } from '@pages/Home/components/';
import { ProjectTypes } from '@interfaces/';
import { IoApps } from 'react-icons/io5';

interface Props {
	project: ProjectTypes;
	projects: ProjectTypes[];
}

export const HeaderContent = memo(({ projects, project }: Props) => {
	const [isShowMenuUser, setIsShowMenuUser] = useState(false);
	const { auth, setAuth } = useAuthProvider();

	const handleLogout = () => {
		// setAuth({
		// 	_id: '',
		// 	name: '',
		// 	email: '',
		// 	confirm: false,
		// 	colorImg: '',
		// });

		localStorage.setItem('token', '');
	};

	// const handleResetProject = () => {
	// 	setProject({
	// 		_id: '',
	// 		name: '',
	// 		name_img: '',
	// 		description: '',
	// 		collaborators: [],
	// 		creator: '',
	// 		type: '',
	// 	});

	// 	setLists({ lists: [] });
	// };

	return (
		<header>
			<div className='border-b-neutral-700 relative flex items-center border-b mx-auto p-4'>
				<Link
					to='/'
					// onClick={handleResetProject}
				>
					<Logo
						width={100}
						height={30}
					/>
				</Link>

				{location.pathname !== '/' && (
					<>
						<span className='px-2 border-r-2 border-neutral-700'>
							<p className='text-white font-medium capitalize'>{project.name}</p>
						</span>

						<Link
							to='/board'
							// onClick={handleResetProject}
						>
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

				<Search projects={projects} />

				<div className='user-session relative flex items-center cursor-pointer'>
					<div onClick={() => setIsShowMenuUser(!isShowMenuUser)}>
						<ImageProfile
							name={auth.name}
							color={auth.colorImg}
						/>
					</div>

					{isShowMenuUser && (
						<div className='border-neutral-600 bg-neutral-800 flex flex-col border rounded-md transition-opacity absolute top-10 right-0 p-1 z-40 w-24'>
							<span
								className='text-white hover:bg-red-600 transition-colors cursor-pointer p-2 rounded'
								onClick={handleLogout}>
								Logout
							</span>
						</div>
					)}
				</div>
			</div>
		</header>
	);
});
