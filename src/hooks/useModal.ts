import { useState } from 'react';

export const useModal = () => {
	const [isShow, setIsShow] = useState(false);

	const onOpen = () => {
		setIsShow(!isShow);
	};

	return {
		isShow,
		onOpen,
	};
};
