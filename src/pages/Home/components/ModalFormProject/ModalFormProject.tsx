import { useState, useRef } from 'react';
import { useAppDispatch } from '@hooks/';
import { LabelElement } from '@components/';
import { fileUpload } from '@utils/';
import { IoClose, IoImage } from 'react-icons/io5';

import './ModalFormProject.css';
import { createProject, destroyImage } from '@redux/home/slices/projectslice';

interface Props {
	showModal?: boolean;
	setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const valuesProject = {
	name: '',
	name_img: '',
	type: '',
	public_id: '',
};

export const ModalFormProject = ({ setShowModal }: Props) => {
	const [value, setValue] = useState(valuesProject);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const handleCreateProject = () => {
		if (value.name.length <= 2 || value.type === '') {
			console.log('Elige el tipo');
			return;
		}

		dispatch(createProject(value));
		setValue(valuesProject);
		setShowModal!(false);
	};

	const handleFileUploadImage = async (image: FileList) => {
		const respFileUpload = await fileUpload(image[0]);
		setValue({
			...value,
			name_img: respFileUpload.url,
			public_id: respFileUpload?.public_id,
			type: respFileUpload.resource_type,
		});
	};

	const handleDestroyImage = async () => {
		if (!value.public_id) {
			setShowModal!(false);
			return;
		}

		await dispatch(destroyImage(value.public_id));
		setValue(value);
		setShowModal!(false);
	};

	const closeModal = () => {
		handleDestroyImage();
		setShowModal!(false);
	};

	return (
		<div className='modal-container-board z-50'>
			<div className='modal-card-board relative'>
				<div
					className='close-modal-form-card absolute right-2 top-2 z-40 cursor-pointer bg-blue-600 rounded-lg'
					onClick={closeModal}>
					<IoClose
						className='text-white'
						size={30}
					/>
				</div>

				<div className='bg-neutral-800 p-4 rounded-lg'>
					<div className='image-board mb-5'>
						{!!value.name_img ? (
							<img
								src={value.name_img}
								alt='Image Board'
								className='w-full object-cover rounded-lg h-[120px]'
							/>
						) : (
							<img
								src='https://static.vecteezy.com/system/resources/previews/002/058/031/non_2x/picture-icon-photo-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg'
								alt='Image Board'
								className='w-full object-cover rounded-lg h-[120px]'
							/>
						)}
					</div>

					<div className='form-create-board'>
						<input
							type='text'
							placeholder='Add Board Title'
							className='w-full mb-6 text-sm text-white p-2 bg-neutral-700 rounded-lg focus-visible:outline-none'
							value={value.name}
							onChange={(e) => setValue({ ...value, name: e.target.value })}
							onBlur={() => console.log('onBlur')}
						/>

						<div className='labels-actions relative flex gap-2 justify-center mb-4'>
							<div className='w-full mr-2'>
								<LabelElement
									label='Cover'
									classname='bg-neutral-600 w-full mx-0'
									handleFunction={() => fileInputRef.current?.click()}>
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
								className='bg-neutral-600 text-white rounded-md block w-full text-xs py-1 px-3'
								onChange={(e) => setValue({ ...value, type: e.target.value })}>
								<option value=''>-- Type --</option>
								<option value='public'> Public </option>
								<option value='private'> Private </option>
							</select>
						</div>

						<div className='buttons-accions flex justify-end'>
							<button
								type='button'
								className='py-1 px-3 text-white text-sm rounded-lg'
								onClick={handleDestroyImage}>
								Cancel
							</button>

							<button
								type='button'
								className='py-1 px-3 bg-blue-600 text-white text-sm rounded-lg'
								onClick={handleCreateProject}>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
