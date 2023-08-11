import { useAppSelector, useProvider } from '@hooks/';
import { SubHeaderContent } from './SubHeaderContent';
import { useState } from 'react';

export const SubHeader = () => {
	const [isShowMenuProject, setIsShowMenuProject] = useState(false);
	const { project } = useAppSelector((state) => state.lists);

	return (
		<SubHeaderContent
			project={project}
			isShowMenuProject={isShowMenuProject}
			setIsShowMenuProject={setIsShowMenuProject}
		/>
	);
};
