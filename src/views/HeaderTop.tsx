import { Logo } from './Components';
import ImagePerfilEx from '../assets/perfil-image-ex.jpg';
import { IoApps, IoArrowDownOutline } from 'react-icons/io5';

export const HeaderTop = () => {
	return (
		<header>
			<div className='header-top contenedor mx-auto flex items-center border-b-zinc-100  border-b'>
				<Logo />

				<div className='px-2 border-r-2'>
					<span>DevChallenges Board</span>
				</div>

				<div className='all-board flex items-center bg-slate-500 rounded-lg py-1 px-2 mx-3 text-xs cursor-pointer'>
					<IoApps color='white' />
					<span className='text-white ml-1'>All Board</span>
				</div>

				<div className='search-keyword relative flex justify-end flex-1 w-full'>
					<input
						type='text'
						placeholder='Keyword...'
						className='rounded-md py-1 px-3 shadow-lg'
					/>
					<button className='bg-blue-600 text-white p-2 rounded-md '>Search</button>
				</div>

				<div className='user-session flex items-center ml-10 cursor-pointer'>
					<div className='user-image w-12 mr-5 '>
						<img
							src={ImagePerfilEx}
							alt='Perfil Image'
							className='rounded-sm'
						/>
					</div>

					<span>Rafael Alvarez</span>

					<IoArrowDownOutline
						className='ml-1'
					/>
				</div>
			</div>
		</header>
	);
};
