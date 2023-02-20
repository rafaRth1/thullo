export const useDate = () => {
	const date = new Date();
	const minutes =
		Number(date.getMinutes()) < 10 ? `0${Number(date.getMinutes())}` : Number(date.getMinutes());
	const hours = date.getHours();
	const day = Number(date.getDate()) < 10 ? `0${Number(date.getDate())}` : Number(date.getDate());
	const month = new Intl.DateTimeFormat('en-EN', { month: 'long' }).format(new Date());
	const year = date.getFullYear();

	return {
		minutes,
		hours,
		day,
		month,
		year,
	};
};
