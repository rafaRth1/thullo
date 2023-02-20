import { AppDispatch } from '../store';
import { setImages } from './appSlice';

export const startApp = () => {};

export const startSearchImage = (value: string) => {
	return async (dispatch: AppDispatch) => {
		const url = 'https://api.unsplash.com/';
		const KEY_ACCESS = '6FQDCHh4XoVTmT-V6FlPE_kkoL2Cx4q_yvPrWBfoT7o';

		const data = await fetch(`${url}/search/photos/?client_id=${KEY_ACCESS}&query=${value}&per_page=12`);
		const { results } = await data.json();

		dispatch(setImages(results));
	};
};
