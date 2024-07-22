import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
}

const ModalHeader = ({ children, className }: Props) => {
	const { onOpenChange } = useContext(ModalContext);

	return (
		<header
			className={`px-6 py-4 ${className ? className : ''}`}
			data-modal='modal-header'>
			<button
				className='cursor-pointer absolute top-1 right-1 p-[7px] bg-transparent rounded-3xl hover:bg-neutral-700'
				onClick={() => onOpenChange()}>
				<IoCloseOutline
					className='text-white '
					size={18}
				/>
			</button>
			{children}
		</header>
	);
};

export default ModalHeader;
