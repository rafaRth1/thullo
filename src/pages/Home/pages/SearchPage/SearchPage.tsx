import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectApi } from '@redux/home/apis';
import { Alerta } from '@components/';

export const SearchPage = () => {
	const { data: projects = [] } = projectApi.endpoints.getProjects.useQuery();
	const [alerta, setAlerta] = useState({ msg: '', error: false });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setAlerta({
			msg: 'Por ahora el buscador no esta disponible',
			error: true,
		});
	};

	const { msg } = alerta;

	return (
		<div className='content-wrapper-search container mx-auto'>
			<h1 className='text-2xl font-medium text-neutral-100 my-5'>Search</h1>

			{msg && <Alerta alerta={alerta} />}

			<div>
				<form
					action=''
					onSubmit={(e) => handleSubmit(e)}>
					<input
						type='text'
						placeholder='Introduzca palabra clave'
						className={`bg-transparent border border-neutral-700 text-white focus-visible:outline-blue-700 h-11 rounded-md w-full py-2 px-3`}
					/>
				</form>

				<div className='content-projects flex flex-col gap-3 mt-5'>
					{projects.map((project) => (
						<Link
							to={`/board/${project._id}`}
							key={project._id}
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
				</div>
			</div>
		</div>
	);
};
