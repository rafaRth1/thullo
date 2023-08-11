import { useRef, useState, useContext } from 'react';
import { useDate, useProvider } from '@hooks/';
import { FormCardContext } from '@context/';
import { LabelElement } from '@components/';
import { fileUpload } from '@utils/fileUpload';
import { Attachment } from './Attachment';
import { IoAddSharp, IoDocumentTextOutline } from 'react-icons/io5';

export const SectionAttachment = () => {
	const [attachement, setAttachement] = useState({ name: '', file: '', name_img: '' });
	const { formState } = useContext(FormCardContext);
	const { setLists } = useProvider();
	const { day, month, year } = useDate();
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
		<div className='attachments-card-content'>
			<div className='header-attachments-card flex mt-5'>
				<div className='flex items-center text-neutral-500 text-sm'>
					<IoDocumentTextOutline
						size={17}
						className='mr-3'
					/>
					<span>Attachments</span>
				</div>

				<button
					onClick={handleAddAttachment}
					type='submit'>
					<LabelElement
						label='Add'
						classname='border-solid border-neutral-700 border-2 hover:text-blue-300 mx-3'>
						<IoAddSharp className='text-white' />
					</LabelElement>
				</button>
			</div>

			<div className='body-attachments-card'>
				<div className='body-attachments-card-items items-center flex m-3'>
					{!!attachement.name_img ? (
						<div
							className='image-attachments '
							style={{ width: '80px', height: '53px' }}>
							<img
								src={attachement.name_img}
								alt='Imagen Attachments'
								className='rounded-xl h-full w-full'
							/>
						</div>
					) : (
						<div
							className='image-attachments border-dashed border-2 border-neutral-500 cursor-pointer bg-neutral-700 rounded-xl flex items-center justify-center'
							style={{ width: '80px', height: '53px' }}
							onClick={() => fileInputRef.current.click()}>
							<span className='text-xs text-white'>Add Image</span>
						</div>
					)}

					<div className='ml-3'>
						<div className='date-add mb-1'>
							<span className='text-xs text-neutral-500 pl-1'>{`Added ${month} ${day},${year}`}</span>

							<input
								type='text'
								name='attachment'
								className='text-sm block w-80 p-1 pr-2 bg-transparent text-white'
								placeholder='Write name attachments'
								value={attachement.name}
								onChange={(e) => setAttachement({ ...attachement, name: e.target.value })}
							/>
						</div>

						<div className='actions-attachments'>
							<input
								type='file'
								onChange={(e: any) => handleFileUploadImage(e.target.files)}
								className='hidden'
								ref={fileInputRef}
							/>
							<button
								type='button'
								className='border-2 py-1 px-3 mr-2 rounded-xl border-neutral-700 text-neutral-500 text-sm'>
								Upload file
							</button>
						</div>
					</div>
				</div>
			</div>

			{formState?.attachments.map((attach: any) => (
				<Attachment
					key={attach.id}
					attach={attach}
					handleDeleteAttachment={handleDeleteAttachment}
				/>
			))}
		</div>
	);
};
