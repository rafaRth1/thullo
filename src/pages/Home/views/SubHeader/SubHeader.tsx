import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProvider } from '@hooks/';
import { SubHeaderContent } from './SubHeaderContent';

export const SubHeader = () => {
	const [isShowMenuProject, setIsShowMenuProject] = useState(false);
	const { project } = useProvider();
	const location = useLocation();

	return location.pathname !== '/' ? (
		<SubHeaderContent
			project={project}
			isShowMenuProject={isShowMenuProject}
			setIsShowMenuProject={setIsShowMenuProject}
		/>
	) : null;
};
