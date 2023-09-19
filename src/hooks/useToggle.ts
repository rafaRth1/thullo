import { useCallback, useState } from 'react';

/**
 * A hook that returns a callback function that can be used to
 * toggle the state of a boolean value.
 * @param initialState
 */

export function useToggle(initialState: boolean = false): [boolean, () => void] {
	const [state, setState] = useState<boolean>(initialState);

	const toggle = useCallback((): void => setState((state) => !state), []);

	return [state, toggle];
}
