import { useDeleteTaskCardMutation } from '@redux/home/apis';
import { SectionCovers, SectionLabels, SectionMembers } from './';
import { IoImage, IoPeopleSharp, IoPersonCircleOutline, IoPricetag } from 'react-icons/io5';
import { useFormCardProvider } from '@hooks/useFormCardProvider';
import { Popover } from '@components/Popover';

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

			<div className='actions-labels'>
				<Popover preferredPosition='bottom-center'>
					<Popover.PopoverContent>
						{(open, onOpenClose) => (
							<>
								<Popover.Trigger>
									<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2 mt-2'>
										<span className='pl-2'>
											<IoPricetag className='text-white mr-2 text-xs' />
										</span>
										<span className='text-neutral-200 capitalize text-xs'>Labels</span>
									</div>
								</Popover.Trigger>

								<Popover.Body>{open ? <SectionLabels /> : null}</Popover.Body>
							</>
						)}
					</Popover.PopoverContent>
				</Popover>

				<Popover preferredPosition='bottom-center'>
					<Popover.PopoverContent>
						{(open, onOpenClose) => (
							<>
								<Popover.Trigger>
									<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2 mt-2'>
										<span className='pl-2'>
											<IoImage className='text-white mr-2 text-xs' />
										</span>
										<span className='text-neutral-200 capitalize text-xs'>Covers</span>
									</div>
								</Popover.Trigger>

								<Popover.Body>{open ? <SectionCovers /> : null}</Popover.Body>
							</>
						)}
					</Popover.PopoverContent>
				</Popover>

				<Popover preferredPosition='bottom-center'>
					<Popover.PopoverContent>
						{(open, onOpenClose) => (
							<>
								<Popover.Trigger>
									<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2 mt-2'>
										<span className='pl-2'>
											<IoPeopleSharp className='text-white mr-2 text-xs' />
										</span>
										<span className='text-neutral-200 capitalize text-xs'>Members</span>
									</div>
								</Popover.Trigger>
								<Popover.Body>{open ? <SectionMembers /> : null}</Popover.Body>
							</>
						)}
					</Popover.PopoverContent>
				</Popover>

				<div
					className='bg-red-600 hover:bg-red-700 transition-colors rounded p-1 text-center cursor-pointer mt-2'
					onClick={handleDeleteCard}>
					<span className='text-white text-sm'>Delete Card</span>
				</div>
			</div>
		</div>
	);
};
