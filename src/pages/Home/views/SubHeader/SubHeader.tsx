import { useState } from 'react';
import { useProvider } from '@hooks/';
import { SubHeaderContent } from './SubHeaderContent';

export const SubHeader = () => {
	const [isShowMenuProject, setIsShowMenuProject] = useState(false);
	const { project } = useProvider();

	return (
		<SubHeaderContent
			project={project}
			isShowMenuProject={isShowMenuProject}
			setIsShowMenuProject={setIsShowMenuProject}
		/>
	);
};
