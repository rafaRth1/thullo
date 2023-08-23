import { useMemo } from 'react';
import { TaskcardContext } from './TaskcardContext';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const TaskcardProvider = ({ children }: Props) => {
	const contextValue = useMemo(() => ({}), []);

	return <TaskcardContext.Provider value={contextValue}>{children}</TaskcardContext.Provider>;
};
