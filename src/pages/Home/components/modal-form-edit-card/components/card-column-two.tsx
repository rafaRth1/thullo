import { useDeleteTaskCardMutation } from '@redux/home/apis';
import { SectionCovers, SectionLabels, SectionMembers } from '.';
import { IoImage, IoPeopleSharp, IoPersonCircleOutline, IoPricetag } from 'react-icons/io5';
import { useFormCardProvider } from '@hooks/use-form-card-provider';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

interface Props {
	onOpenChangeEditFormCard: () => void;
}

export const CardColumnTwo = ({ onOpenChangeEditFormCard }: Props) => {
	const { cardUpdate } = useFormCardProvider();
	const [deleteTaskCard] = useDeleteTaskCardMutation();

	const handleDeleteCard = async () => {
		const alertValue = confirm('Are you sure you want to delete?');

		if (!alertValue) {
			return;
		}

		await deleteTaskCard(cardUpdate._id!);
		onOpenChangeEditFormCard();
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
					<Popover placement='bottom'>
						<PopoverTrigger className='flex'>
							<Button>
								<IoPricetag className='text-white mx-2' />
								<p className='text-xs flex-1 text-left'>Etiquetas</p>
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<SectionLabels />
						</PopoverContent>
					</Popover>

					<Popover placement='bottom'>
						<PopoverTrigger className='flex'>
							<Button>
								<IoImage className='text-white mx-2' />
								<p className='text-xs flex-1 text-left'>Imagen</p>
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<SectionCovers />
						</PopoverContent>
					</Popover>
				</div>

				<div className='flex flex-col basis-1/2 gap-3'>
					<Popover placement='bottom'>
						<PopoverTrigger className='flex'>
							<Button>
								<IoPeopleSharp className='text-white mx-2' />
								<p className='text-xs flex-1 text-left'>Miembros</p>
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<SectionMembers />
						</PopoverContent>
					</Popover>

					<Button
						variant='light'
						color='danger'
						onClick={handleDeleteCard}>
						Delete Card
					</Button>
				</div>
			</div>
		</div>
	);
};
