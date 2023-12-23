import { useDeleteTaskCardMutation } from '@redux/home/apis';
import { SectionCovers, SectionLabels, SectionMembers } from './';
import { IoImage, IoPeopleSharp, IoPersonCircleOutline, IoPricetag } from 'react-icons/io5';
import { useFormCardProvider } from '@hooks/useFormCardProvider';
import { PopoverCustom } from '@components/PopoverCustom/';

interface Props {
	onOpenFormCard: () => void;
}

export const CardColumnTwo = ({ onOpenFormCard }: Props) => {
	const { cardUpdate } = useFormCardProvider();
	const [deleteTaskCard] = useDeleteTaskCardMutation();

	const handleDeleteCard = async () => {
		const alertValue = confirm('Are you sure you want to delete?');

		if (!alertValue) {
			return;
		}

		await deleteTaskCard(cardUpdate._id!);
		onOpenFormCard();
	};

	return (
		<div className='card-column-two flex-1'>
			<div className='flex items-center text-neutral-500 text-sm self-end'>
				<IoPersonCircleOutline
					size={17}
					className='mr-3'
				/>
				<span>Actions</span>
			</div>

			<div className='flex md:flex-col gap-3 my-3'>
				<div className='flex flex-col basis-1/2 gap-3'>
					<PopoverCustom
						preferredPosition='bottom'
						widthEqualTrigger={true}>
						<PopoverCustom.PopoverContent>
							{(open, onOpenClose) => (
								<>
									<PopoverCustom.Trigger>
										<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2'>
											<span className='pl-2'>
												<IoPricetag className='text-white mr-2 text-xs' />
											</span>
											<span className='text-neutral-200 capitalize text-xs'>Labels</span>
										</div>
									</PopoverCustom.Trigger>

									<PopoverCustom.Body>
										<SectionLabels />
									</PopoverCustom.Body>
								</>
							)}
						</PopoverCustom.PopoverContent>
					</PopoverCustom>

					<PopoverCustom preferredPosition='bottom'>
						<PopoverCustom.PopoverContent>
							{(open, onOpenClose) => (
								<>
									<PopoverCustom.Trigger>
										<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2'>
											<span className='pl-2'>
												<IoImage className='text-white mr-2 text-xs' />
											</span>
											<span className='text-neutral-200 capitalize text-xs'>Covers</span>
										</div>
									</PopoverCustom.Trigger>

									<PopoverCustom.Body>
										<SectionCovers />
									</PopoverCustom.Body>
								</>
							)}
						</PopoverCustom.PopoverContent>
					</PopoverCustom>
				</div>

				<div className='flex flex-col basis-1/2 gap-3'>
					<PopoverCustom preferredPosition='bottom'>
						<PopoverCustom.PopoverContent>
							{(open, onOpenClose) => (
								<>
									<PopoverCustom.Trigger>
										<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2'>
											<span className='pl-2'>
												<IoPeopleSharp className='text-white mr-2 text-xs' />
											</span>
											<span className='text-neutral-200 capitalize text-xs'>Members</span>
										</div>
									</PopoverCustom.Trigger>
									<PopoverCustom.Body>
										<SectionMembers />
									</PopoverCustom.Body>
								</>
							)}
						</PopoverCustom.PopoverContent>
					</PopoverCustom>

					<div
						className='bg-rose-600 hover:bg-rose-700 transition-colors rounded p-1 text-center cursor-pointer'
						onClick={handleDeleteCard}>
						<span className='text-white text-sm'>Delete Card</span>
					</div>
				</div>
			</div>
		</div>
	);
};
