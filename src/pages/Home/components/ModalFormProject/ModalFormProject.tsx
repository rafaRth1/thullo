import { useState, useRef } from 'react';
import { Button, InputThullo } from '@components/';
import { useAppDispatch, useForm } from '@hooks/';
import { fileUpload } from '@utils/';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@components/Modal';
import { useAddProjectMutation } from '@redux/home/apis/project-api';
import { destroyImage } from '@redux/home/slices/projectslice';
import { IoImage, IoLockClosed, IoLockOpen } from 'react-icons/io5';
import './ModalFormProject.css';

const formData = {
	name_board: '',
	name_img: '',
	public_id: '',
	type: 'public',
};

const formValidations = {
	name_board: [(value: string) => value.length > 0, 'Name is void.'],
};

export const ModalFormProject = ({
	isOpenFormProject,
	onOpenFormProject,
}: {
	isOpenFormProject: boolean;
	onOpenFormProject: () => void;
}) => {
	const { formState, setFormState, formValidation, onInputChange } = useForm(formData, formValidations);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [addProject] = useAddProjectMutation();
	const dispatch = useAppDispatch();

	const handleCreateProject = (onOpenChange: () => void) => {
		if (formValidation.name_boardValid) return setFormSubmitted(true);

		setFormSubmitted(false);
		addProject(formState);
		setFormState(formData);
		onOpenChange();
	};

	const handleFileUploadImage = async (image: FileList) => {
		const respFileUpload = await fileUpload(image[0]);
		setFormState({
			...formState,
			name_img: respFileUpload.url,
			public_id: respFileUpload?.public_id,
			type: respFileUpload.resource_type,
		});
	};

	const handleDestroyImage = async () => {
		if (!formState.public_id) {
			return;
		}

		await dispatch(destroyImage(formState.public_id));
		setFormState(formState);
	};

	const handleChangeTypeProject = () => {
		setIsPrivate(!isPrivate);
		setFormState({ ...formState, type: !isPrivate ? 'private' : 'public' });
	};

	const closeModal = (onOpenChange: () => void) => {
		handleDestroyImage();
		onOpenChange();
	};

	return (
		<Modal
			show={isOpenFormProject}
			onOpenChange={onOpenFormProject}>
			<ModalContent>
				{(onOpenChange) => (
					<>
						<ModalHeader className='font-medium text-white'>Modal Form Project</ModalHeader>
						<ModalBody>
							<div className='image-board mb-5'>
								{!!formState.name_img ? (
									<img
										src={formState.name_img}
										alt='Image Board'
										className='w-full object-cover rounded-lg h-[80px]'
									/>
								) : (
									<></>
								)}
							</div>

							<div className='form-create-board'>
								<InputThullo
									type='text'
									name='name_board'
									placeholder='Add Board Title'
									value={formState.name_board}
									onChangeValue={onInputChange}
									isvalid={formValidation.name_boardValid}
									isvalidform={formSubmitted.toString()}
									autocomplete='off'
								/>

								<div className='labels-actions relative flex gap-2 justify-center mb-4'>
									<div className='w-full mr-2'>
										<Button
											className='flex items-center w-full'
											onClick={() => fileInputRef.current?.click()}>
											<IoImage className='text-white mr-2' />
											<span className='text-white text-xs'>Cover</span>
										</Button>

										<input
											type='file'
											onChange={(e: any) => handleFileUploadImage(e.target.files)}
											className='hidden'
											ref={fileInputRef}
										/>
									</div>

									{isPrivate ? (
										<Button
											className='flex items-center w-full'
											onClick={handleChangeTypeProject}>
											<IoLockClosed className='text-white mr-2' />
											<span className='text-white text-xs'>Private</span>
										</Button>
									) : (
										<Button
											className='flex items-center w-full'
											onClick={handleChangeTypeProject}>
											<IoLockOpen className='text-white mr-2' />
											<span className='text-white text-xs'>Public</span>
										</Button>
									)}
								</div>

								<div className='buttons-accions flex justify-end'>
									<Button
										className='text-white mr-2 px-5'
										type='button'
										onClick={() => closeModal(onOpenChange)}>
										Cancel
									</Button>
									<Button
										colorCustom='bg-blue-600'
										type='button'
										className='text-white text-sm rounded-lg px-5'
										onClick={() => handleCreateProject(onOpenChange)}>
										Create
									</Button>
								</div>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
