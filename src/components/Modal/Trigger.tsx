import { ReactElement } from 'react';

interface Props {
	children: ReactElement;
}

export const Trigger = ({ children }: Props) => {
	return <div>{children}</div>;
};
