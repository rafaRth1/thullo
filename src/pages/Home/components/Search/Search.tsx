import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMediaQueryNew } from '@hooks/';
import { projectApi } from '@redux/home/apis';
import { clientAxios } from '@utils/';
import { IoSearchOutline } from 'react-icons/io5';

export const Search = memo(() => {
	const [search, setSearch] = useState('');
	const [isActiveFocus, setIsActiveFocus] = useState(false);
	const [isPointerLeave, setIsPointerLeave] = useState(false);
	const { id } = useParams();
	const refInput = useRef<HTMLInputElement>(null);
	const { data: projects = [] } = projectApi.endpoints.getProjects.useQuery();
	const match = useMediaQueryNew('(min-width:632px)', true, matchMedia, null, false);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await clientAxios.post('/search', { search });

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const onFocus = () => {
		setIsActiveFocus(true);
	};

	const onBlur = () => {
		if (isPointerLeave) {
			refInput.current?.focus();
			return;
		}

		refInput.current?.blur();
		setIsActiveFocus(false);
	};

	const handlerStopFocusKeycap = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			refInput.current?.blur();
			setIsActiveFocus(false);
		}
	};

	const handlerMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		setIsPointerLeave(true);
	}, []);

	const handlerMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		setIsPointerLeave(false);
	}, []);

	useEffect(() => {
		refInput.current?.blur();
		setIsPointerLeave(false);
		setIsActiveFocus(false);

		return () => {};
	}, [id]);

	return (
		<div className='flex justify-end w-full mr-4'>
			{match ? (
				<div
					className='search-container relative'
					onMouseLeave={handlerMouseLeave}
					onMouseEnter={handlerMouseEnter}>
					<input
						ref={refInput}
						autoComplete='off'
						placeholder='Search'
						id='search'
						type='search'
						className={`bg-transparent border border-neutral-700 text-white focus-visible:outline-blue-700 h-11 ${
							isActiveFocus ? 'w-full lg:w-[500px]' : 'w-[300px]'
						} rounded-md py-1 px-3 mr-2`}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onKeyUp={(e) => handlerStopFocusKeycap(e)}
						onFocus={onFocus}
						onBlur={onBlur}
					/>

					{isActiveFocus ? (
						<div className='result-search absolute bg-neutral-700 w-full p-2 rounded-md mt-4 z-20'>
							<span className='text-neutral-300 uppercase'>Proyectos Recientes</span>

							<ul className='flex flex-col'>
								{projects.map((project) => (
									<Link
										to={`/board/${project._id}`}
										key={project._id}
										onClick={() => {
											setIsPointerLeave(false);
											refInput.current?.focus();
										}}
										className='flex items-center p-1 hover:bg-neutral-600 rounded'>
										<img
											src={
												project.name_img
													? project.name_img
													: 'https://i.pinimg.com/originals/85/a3/09/85a309ce4204e643f6ccb4c45d4bce4b.jpg'
											}
											alt='Image Project'
											className='w-14 h-10 rounded'
										/>

										<div className='flex flex-col'>
											<span className='text-neutral-200 ml-3'>{project.name}</span>
											<span className='text-neutral-400 ml-3'>Workspace</span>
										</div>
									</Link>
								))}
							</ul>
						</div>
					) : null}
				</div>
			) : (
				<Link to={'/search'}>
					<IoSearchOutline
						size={25}
						className='text-neutral-100 mx-4 cursor-pointer'
						onClick={() => console.log('redirigiendo seccion search')}
					/>
				</Link>
			)}
		</div>
	);
});
