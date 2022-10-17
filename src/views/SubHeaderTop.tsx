import { ImagenProfile, LabelElement } from '../components';
import { IoAddOutline, IoEllipsisHorizontalSharp, IoLockClosed } from 'react-icons/io5';
import ImagePerfilEx from '../assets/perfil-image-ex.jpg';

export const SubHeaderTop = () => {
	return (
		<div className='sub-header-top contenedor flex items-center justify-between'>
			<div className='flex items-center'>
				<LabelElement
					label='Private'
					classname={'mr-10'}>
					<IoLockClosed />
				</LabelElement>

				<div className='allowed-group flex'>
					<ImagenProfile imageProfile={ImagePerfilEx} />
					<ImagenProfile imageProfile={ImagePerfilEx} />
					<ImagenProfile imageProfile={ImagePerfilEx} />
					<div className='user-image-add'>
						<span className='bg-blue-500 h-11 w-12 object-cover rounded-xl text-3xl inline-flex items-center justify-center cursor-pointer'>
							<IoAddOutline />
						</span>
					</div>
				</div>
			</div>

			<LabelElement label='Show Menu'>
				<IoEllipsisHorizontalSharp />
			</LabelElement>
		</div>
	);
};
