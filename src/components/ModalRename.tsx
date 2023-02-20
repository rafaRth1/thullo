import { useState } from 'react';
import clientAxios from '../config/clientAxios';
import { useProvider } from '../hooks';

interface Props {
	modalRename: boolean;
	setModalRename: React.Dispatch<React.SetStateAction<boolean>>;
	list: any;
	setShowMenuList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalRename = ({ modalRename, setModalRename, list, setShowMenuList }: Props) => {
	const [nameList, setNameList] = useState('');
	const { setAlertHigh, setOverflow } = useProvider();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.put(`/list/${list._id}`, { name: nameList }, config);

			setModalRename(false);
			setShowMenuList(false);

			setAlertHigh({
				msg: data.msg,
				error: false,
			});

			setTimeout(() => {
				setAlertHigh({
					msg: '',
					error: false,
				});
			}, 3000);
		} catch (error: any) {
			setAlertHigh({
				msg: error.response.data.msg,
				error: true,
			});

			setTimeout(() => {
				setAlertHigh({
					msg: '',
					error: false,
				});
			}, 3000);
		}
	};

	return (
		<div
			className={`fixed inset-0 w-full flex-col h-full flex justify-center items-center backdrop-blur transition-opacity z-50 ${
				modalRename ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
			}`}>
			<form
				className='flex flex-col z-50'
				onSubmit={(e) => handleSubmit(e)}>
				<input
					type='text'
					placeholder='Editar Nombre'
					className='p-3 outline-none rounded-xl bg-neutral-600 text-white mb-5'
					value={nameList}
					onChange={(e) => setNameList(e.target.value)}
				/>

				<button className='text-white bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded-lg'>
					Edit Name
				</button>
			</form>
			<div
				className='absolute top-0 left-0 w-full h-full z-40'
				onClick={() => {
					setModalRename(false), setOverflow(false), setShowMenuList(false);
				}}></div>
		</div>
	);
};
