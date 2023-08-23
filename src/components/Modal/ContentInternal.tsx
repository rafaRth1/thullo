import { ReactElement } from 'react';

interface Props {
	children: ReactElement | ReactElement[];
}

export const ContentInternal = ({ children }: Props) => {
	return (
		<div className='modal-content-internal fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur transition-opacity z-50'>
			{children}
		</div>
	);
};
