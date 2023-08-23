import { ReactElement, useContext } from 'react';
import { ContentInternal } from './ContentInternal';
import { ModalContext } from './context/ModalContext';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface Props {
	children: ReactElement | ReactElement[];
}

export const Content = ({ children }: Props) => {
	const { isShow, setIsShow } = useContext(ModalContext);

	if (!isShow) {
		return <></>;
	}

	return (
		<ContentInternal>
			<>
				<div
					className='cursor-pointer absolute top-12 right-12 z-50'
					onClick={() => setIsShow(false)}>
					<IoCloseCircleOutline
						className='text-white'
						size={30}
					/>
				</div>

				{children}
			</>
		</ContentInternal>
	);
};
