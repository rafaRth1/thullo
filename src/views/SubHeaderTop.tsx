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
						<span className='bg-blue-500 w-9 h-9 object-cover rounded-md text-3xl inline-flex items-center justify-center cursor-pointer'>
							<IoAddOutline
								color='white'
								size={20}
							/>
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
