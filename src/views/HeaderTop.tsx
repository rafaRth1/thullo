import { Logo } from './Components';
import { ImagenProfile, LabelElement } from '../components';
import { IoApps, IoArrowDownOutline } from 'react-icons/io5';
import ImagePerfilEx from '../assets/perfil-image-ex.jpg';

export const HeaderTop = () => {
	return (
		<header>
			<div className='header-top contenedor mx-auto flex items-center border-b-zinc-100  border-b'>
				<Logo />

				<div className='px-2 border-r-2'>
					<span>DevChallenges Board</span>
				</div>

				<LabelElement label='All Board'>
					<IoApps color='white' />
				</LabelElement>

				<div className='search-keyword relative flex justify-end flex-1 w-full'>
					<input
						type='text'
						placeholder='Keyword...'
						className='rounded-md py-1 px-3 shadow-lg'
					/>
					<button className='bg-blue-600 text-white p-2 rounded-md '>Search</button>
				</div>

				<div className='user-session flex items-center ml-10 cursor-pointer'>
					<ImagenProfile imageProfile={ImagePerfilEx} />

					<span>Rafael Alvarez</span>

					<IoArrowDownOutline className='ml-1' />
				</div>
			</div>
		</header>
	);
};
