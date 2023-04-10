import { useState, memo, useRef } from 'react';
import { LabelElement } from '../';
import { useProvider } from '../../hooks';
import clientAxios from '../../config/clientAxios';
import { fileUpload } from '../../helpers';
import { IoClose, IoImage } from 'react-icons/io5';
import './ModalCreateBoard.css';

interface Props {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateBoard = memo(({ showModal, setShowModal }: Props) => {
	const [value, setValue] = useState({
		name_title: '',
		name_img:
			'https://res.cloudinary.com/dork20pxe/image/upload/v1674275936/trullo-trello-clone/l8hc7bkbf0ijfmk4fhw1.avif',
		type: '',
	});
	const fileInputRef: any = useRef(null);

	const { setProjects } = useProvider();

	const handleAddBoard = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (value.name_title.length <= 2 || value.type === '') {
			console.log('Elige el tipo');
			return;
		}

		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.post(
				'/projects',
				{
					name: value.name_title,
					name_img: value.name_img,
					type: value.type,
				},
				config
			);

			setProjects((prevProjects) => [...prevProjects, data]);
			setValue({ name_title: '', name_img: '', type: '' });
			setShowModal(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFileUploadImage = async (image: FileList) => {
		const respFileUpload = await fileUpload(image[0]);
		setValue({ ...value, name_img: respFileUpload });
	};

	return (
		<div className={`modal-container-board z-50 ${showModal ? 'active-modal-card' : ''}`}>
			<div className={`modal-card-board relative ${showModal ? 'pointer-events-auto' : ''}`}>
				<div
					className='close-modal-form-card absolute right-2 top-2 z-40 cursor-pointer bg-blue-600 rounded-lg'
					onClick={() => setShowModal(false)}>
					<IoClose
						className='text-white'
						size={30}
					/>
				</div>

				<div className='bg-neutral-800 p-4  rounded-lg'>
					<div className='image-board mb-5'>
						{!!value.name_img ? (
							<img
								src={value.name_img}
								alt='Image Board'
								className='w-full object-cover rounded-lg'
								style={{ height: '120px' }}
							/>
						) : (
							// <img
							// 	src='https://static.vecteezy.com/system/resources/previews/002/058/031/non_2x/picture-icon-photo-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg'
							// 	alt='Image Board'
							// 	className='w-full object-cover rounded-lg'
							// 	style={{ height: '120px' }}
							// />
							<img
								src='https://res.cloudinary.com/dork20pxe/image/upload/v1674275936/trullo-trello-clone/l8hc7bkbf0ijfmk4fhw1.avif'
								alt='Image Board'
								className='w-full object-cover rounded-lg'
								style={{ height: '120px' }}
							/>
						)}
					</div>

					<div className='form-create-board'>
						<input
							type='text'
							placeholder='Add Board Title'
							className='w-full mb-6 text-sm text-white p-2 bg-neutral-700 rounded-lg focus-visible:outline-none'
							value={value.name_title}
							onChange={(e) => setValue({ ...value, name_title: e.target.value })}
						/>

						<div className='labels-accions relative flex justify-center mb-4'>
							<div className='w-full mr-2'>
								<LabelElement
									label='Cover'
									classname='bg-neutral-600 w-full mr-3 mx-0'
									handleFunction={() => fileInputRef.current.click()}>
									<IoImage className='text-white mr-2' />
								</LabelElement>

								<input
									type='file'
									onChange={(e: any) => handleFileUploadImage(e.target.files)}
									className='hidden'
									ref={fileInputRef}
								/>
							</div>

							<select
								name='select-status'
								className='bg-neutral-600 text-white rounded-md block w-full text-sm'
								onChange={(e) => setValue({ ...value, type: e.target.value })}>
								<option value=''>--Seleccionar--</option>
								<option value='public'> Public </option>
								<option value='private'> Private </option>
							</select>
						</div>

						<div className='buttons-accions flex justify-end'>
							<button className='py-1 px-3 text-white text-sm rounded-lg'>Cancel</button>
							<button
								className='py-1 px-3 bg-blue-600 text-white text-sm rounded-lg'
								onClick={(e) => handleAddBoard(e)}>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
