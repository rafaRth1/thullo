import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { Search } from '@pages/home/components';
import { useAppDispatch, useAuthProvider } from '@hooks/';
import { Logo } from '@components/';
import { projectApi } from '@redux/home/apis';
import { ProjectTypes } from '@interfaces/';
import { IoApps } from 'react-icons/io5';
import { Avatar } from '@nextui-org/react';

interface Props {
	project: ProjectTypes;
}

export const HeaderContent = memo(({ project }: Props) => {
	const { auth, setAuth } = useAuthProvider();
	const dispatch = useAppDispatch();
	const location = useLocation();

	const handleLogout = () => {
		setAuth({
			_id: '',
			name: '',
			email: '',
			confirm: false,
			colorImg: '',
		});

		dispatch(projectApi.util.resetApiState());

		localStorage.setItem('token', '');
	};

	return (
		<header className=''>
			<div className='relative flex items-center mx-auto p-4'>
				<Link
					to='/'
					// onClick={handleLogout}
				>
					<Logo
						width={100}
						height={30}
					/>
				</Link>

				{location.pathname !== '/' && (
					<>
						<Link
							to='/board'
							// onClick={handleResetProject}
						>
							<Button>
								<IoApps
									className='text-neutral-200'
									size={15}
								/>
								Proyectos
							</Button>
						</Link>
					</>
				)}

				<div className='flex-1' />

				{location.pathname !== '/search' ? <Search /> : null}

				<div className='user-session relative flex items-center cursor-pointer'>
					<Dropdown>
						<DropdownTrigger>
							<Avatar
								name={auth.name}
								style={{ backgroundColor: auth.colorImg }}
								radius='sm'
							/>
						</DropdownTrigger>
						<DropdownMenu>
							<DropdownItem
								key='logout'
								className='text-danger'
								color='danger'
								onClick={() => handleLogout()}>
								Logout
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</header>
	);
});
