import { useEffect, useState } from 'react';
import clientAxios from '../utils/client-axios';

export const useFetch = <T>(query: string): { data: T; isLoading: boolean } => {
	const [data, setData] = useState<T>([] as T);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleFetch = async () => {
			setIsLoading(true);
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const { data } = await clientAxios(query, config);
				setData(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		handleFetch();
	}, []);

	return { data, isLoading };
};
