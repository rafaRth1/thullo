import { useRef, useState, useContext } from 'react';
import { Button, Input } from '@nextui-org/react';
import { FormCardContext } from '@context/';
import { fileUpload } from '@utils/';
import { Attachment } from './attachment';

export const Attachments = () => {
	const [attachement, setAttachement] = useState({ name: '', file: '', name_img: '' });
	const { cardUpdate } = useContext(FormCardContext);
	const fileInputRef: any = useRef(null);

	const handleAddAttachment = async () => {
		// formState.attachments = [...formState.attachments, { id: Date.now(), ...attachement }];
		// setLists((list) => [...list]);
		// setAttachement({ name: '', file: '', name_img: '' });
	};

	const handleDeleteAttachment = (id: number) => {
		// const deleteComment = formState.attachments.filter((attachment: any) => attachment.id !== id);
		// formState.attachments = [...deleteComment];
		// setLists((list) => [...list]);
	};

	const handleFileUploadImage = async (image: FileList) => {
		const respFileUpload = await fileUpload(image[0]);
		setAttachement({ ...attachement, name_img: respFileUpload });
	};

	return (
		<div className='attachments-card-content mb-4'>
			<div className='body-attachments-card-items flex flex-col items-center'>
				<Input
					type='text'
					name='attachment'
					label='Nombre archivo'
					className='mb-3'
					value={attachement.name}
					onChange={(e) => setAttachement({ ...attachement, name: e.target.value })}
				/>

				<div className='flex items-center w-full'>
					<Button
						type='button'
						color='warning'
						className='mr-4'
						onClick={() => fileInputRef.current.click()}>
						Agregar archivo
					</Button>

					<input
						type='file'
						onChange={(e: any) => handleFileUploadImage(e.target.files)}
						className='hidden'
						ref={fileInputRef}
					/>

					<Button
						type='button'
						color='primary'>
						Subir archivo
					</Button>
				</div>
			</div>

			{cardUpdate?.attachments.map((attach: any) => (
				<Attachment
					key={attach.id}
					attach={attach}
					handleDeleteAttachment={handleDeleteAttachment}
				/>
			))}
		</div>
	);
};
