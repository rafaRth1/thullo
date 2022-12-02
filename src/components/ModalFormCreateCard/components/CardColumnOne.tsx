import { InputNameCard } from './';
import { LabelElement } from '../../LabelElement';
import { ImagenProfile } from '../../Profile/ImagenProfile';
import ImagePerfilEx from '../../../assets/perfi-imagen-2.jpg';
import { IoAdd, IoDocumentTextOutline, IoPencilSharp } from 'react-icons/io5';

interface Props {
	formState: any;
	onInputChange: any;
	formValidation: any;
	formSubmitted: any;
	cardUpdate: {
		id: number;
		name_card: string;
		attachments: never[];
		comments: never[];
		description: string;
		url_image: string;
	};
}

export const CardColumnOne = ({
	formState,
	onInputChange,
	formValidation,
	formSubmitted,
	cardUpdate,
}: Props) => {
	return (
		<>
			<InputNameCard
				formState={formState}
				onInputChange={onInputChange}
				formValidation={formValidation}
				formSubmitted={formSubmitted}
				cardUpdate={cardUpdate}
			/>

			<span className='text-xs text-neutral-500'>in list In Progress</span>

			<div className='input-description-card'>
				<div className='header-description flex mt-5'>
					<div className='flex items-center text-neutral-500 text-sm'>
						<IoDocumentTextOutline
							size={17}
							className='mr-3'
						/>
						<span>Description</span>
					</div>

					<LabelElement label='Edit'>
						<IoPencilSharp className='text-white' />
					</LabelElement>
				</div>

				<textarea
					className='w-full p-2 mt-3 bg-transparent'
					placeholder='Write a description...'
					value={formState.description}
					onChange={onInputChange}
					name='description'></textarea>
			</div>

			<div className='attachments-content'>
				<div className='header-attachments-card flex mt-5'>
					<div className='flex items-center text-neutral-500 text-sm'>
						<IoDocumentTextOutline
							size={17}
							className='mr-3'
						/>
						<span>Attachments</span>
					</div>

					<LabelElement label='Add'>
						<IoAdd className='text-white' />
					</LabelElement>
				</div>

				<div className='body-attachments-card'>
					<div className='body-attachments-card-items flex items-center m-3'>
						<div
							className='image-attachments'
							style={{ width: '80px', height: '53px' }}>
							<img
								src='https://concepto.de/wp-content/uploads/2015/03/paisaje-800x409.jpg'
								alt='Imagen Attachments'
								className='rounded-xl object-cover h-full w-full'
							/>
						</div>

						<div className='ml-3'>
							<div className='date-add'>
								<span className='text-sm text-neutral-500'>Added July 5,2020</span>
								<p>Reasoning by Ranganath Krishnamani</p>
							</div>

							<div className='actions-attachments'>
								<button className='border-2 py-1 px-3 mr-2 rounded-xl border-neutral-400 text-neutral-500'>
									Download
								</button>
								<button className='border-2 py-1 px-3 rounded-xl border-neutral-400 text-neutral-500'>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='comments-content'>
				<div className='box-comment-add relative'>
					{/* <span className='absolute top-7 left-5 text-neutral-500'>Write a comment...</span> */}

					<div className='absolute top-5 left-2'>
						<ImagenProfile imageProfile={ImagePerfilEx} />
					</div>

					<textarea
						className='w-full h-28 p-2 rounded-xl shadow-xl my-3 pl-14 pt-4'
						placeholder='Write a comment...'></textarea>

					<button className='bg-blue-500 text-white px-3 py-1 rounded-xl absolute bottom-6 right-3'>
						Comment
					</button>
				</div>

				<div className='list-comments w-full'>
					<div className='card-comment'>
						<div className='flex items-center justify-between'>
							<div className='profile-author flex'>
								<ImagenProfile imageProfile={ImagePerfilEx} />
								<div className='flex flex-col'>
									<div className='name-author-comment'>Mikael Stanley</div>
									<div className='date'>24 August at 20:03</div>
								</div>
							</div>

							<div className='actions-comments cursor-pointer'>Edit - Delete</div>
						</div>

						<div className='body-comment'>
							“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir
							Richard Burton
						</div>
					</div>

					<div className='card-comment mt-5'>
						<div className='flex items-center justify-between'>
							<div className='profile-author flex'>
								<ImagenProfile imageProfile={ImagePerfilEx} />
								<div className='flex flex-col'>
									<div className='name-author-comment'>Mikael Stanley</div>
									<div className='date'>24 August at 20:03</div>
								</div>
							</div>

							<div className='actions-comments cursor-pointer'>Edit - Delete</div>
						</div>

						<div className='body-comment'>
							“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir
							Richard Burton
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
