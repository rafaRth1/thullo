import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '@pages/Home/components/';
import { useAppDispatch, useAuthProvider } from '@hooks/';
import { ImageProfile, LabelElement, Logo } from '@components/';
import { PopoverCustom } from '@components/PopoverCustom';
import { projectApi } from '@redux/home/apis';
import { ProjectTypes } from '@interfaces/';
import { IoApps } from 'react-icons/io5';

interface Props {
	project: ProjectTypes;
}

export const HeaderContent = memo(({ project }: Props) => {
	const { auth, setAuth } = useAuthProvider();
	const dispatch = useAppDispatch();

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
		<header className='shadow-[0_5px_20px_-5px_rgba(0,0,0,0.4)] '>
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
							<LabelElement
								label='All Board'
								classname='bg-neutral-700'>
								<IoApps
									className='text-neutral-200'
									size={15}
								/>
							</LabelElement>
						</Link>
					</>
				)}

				<Search />

				<div className={`user-session relative flex items-center cursor-pointer`}>
					<PopoverCustom preferredPosition='bottom-end'>
						<PopoverCustom.PopoverContent>
							{() => (
								<>
									<PopoverCustom.Trigger>
										<div>
											<ImageProfile
												name={auth.name}
												color={auth.colorImg}
											/>
										</div>
									</PopoverCustom.Trigger>

									<PopoverCustom.Body>
										<div
											className={`border-neutral-600 bg-neutral-800 flex flex-col border rounded-md transition-opacity z-40 w-44`}>
											<span
												className='text-white hover:bg-red-600 transition-colors cursor-pointer p-2 rounded'
												// onClick={handleLogout}
												onClick={handleLogout}>
												Logout
											</span>
										</div>
									</PopoverCustom.Body>
								</>
							)}
						</PopoverCustom.PopoverContent>
					</PopoverCustom>
				</div>
			</div>
		</header>
	);
});
