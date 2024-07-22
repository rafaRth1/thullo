import { useState, useRef } from 'react';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Switch } from '@nextui-org/switch';
import { useAddProjectMutation } from '@redux/home/apis/project-api';
import { fileUpload } from '@utils/';
import { IoImageOutline } from 'react-icons/io5';

interface Props {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
}

export const ModalFormProject = ({ isOpen, onOpen, onOpenChange }: Props) => {
	const [formValues, setFormValues] = useState({
		name_board: '',
		name_img: '',
		name_img_blob: '',
		public_id: '',
		type: false,
	});
	const [msg, setMsg] = useState({ content: '', isError: false });
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [addProject] = useAddProjectMutation();

	const handleCreateProject = async () => {
		if (formValues.name_board.length === 0) {
			return;
		}

		if (fileInputRef.current?.files?.length === 1) {
			const response = await fileUpload(fileInputRef.current.files[0]);

			addProject({
				...formValues,
				name_img: response.url,
				public_id: response.public_id,
			});

			onOpenChange();
			return;
		}

		addProject({
			...formValues,
		});

		onOpenChange();
	};

	const handleFileUploadImage = async (image: FileList) => {
		const fileReader = new FileReader();

		if (image[0].size / 1000 > 1024) {
			return setMsg({ content: 'La imagen tiene que ser menor a 1mb', isError: true });
		}

		fileReader.readAsDataURL(image[0]);

		fileReader.addEventListener('load', (e: any) => {
			setFormValues({ ...formValues, name_img_blob: e.target.result });
		});

		setMsg({ content: '', isError: false });
	};

	const { content } = msg;

	return (
		<Modal
			backdrop='blur'
			isOpen={isOpen}
			onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>Crear nuevo proyecto</ModalHeader>
						<ModalBody>
							{formValues.name_img_blob && (
								<div
									className='image-board mb-1 transition-all hover:opacity-80 cursor-not-allowed'
									onClick={() => setFormValues({ ...formValues, name_img_blob: '' })}>
									<img
										src={formValues.name_img_blob}
										alt='Image Board'
										className='w-full object-cover rounded-lg h-[190px]'
									/>
								</div>
							)}

							<div className='form-create-board'>
								<Input
									type='text'
									label='Ingresar título'
									className='mb-5'
									value={formValues.name_board}
									onValueChange={(value) => setFormValues({ ...formValues, name_board: value })}
								/>

								<div className='labels-actions relative mb-4'>
									<div className='w-full'>
										<button
											className='flex flex-col justify-center items-center w-full h-36 text-neutral-100 bg-[#27272a] rounded border-neutral-600 border-2 border-dashed active:scale-[.99] mb-5'
											onClick={() => fileInputRef.current?.click()}>
											<IoImageOutline
												size='45'
												className='inline p-3 bg-neutral-800 rounded-full mb-3'
											/>
											<p className='text-sm'>Seleccionar imagen</p>
											<span className='text-sm text-neutral-400'>Cantidad maxima 1MB</span>
										</button>

										<input
											type='file'
											onChange={(e) => handleFileUploadImage(e.target.files!)}
											className='hidden'
											ref={fileInputRef}
										/>
									</div>

									<Switch
										isSelected={formValues.type}
										onValueChange={(e) => setFormValues({ ...formValues, type: e })}>
										<p className='text-sm'>{formValues.type ? 'Proyecto privado' : 'Proyecto publico'}</p>
									</Switch>

									{msg.isError && <p className='text-rose-600 mt-5 text-sm'>{content}</p>}
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								onPress={() => onClose()}>
								Close
							</Button>

							<Button
								color='primary'
								onPress={() => handleCreateProject()}>
								Crear proyecto
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
