import { createContext } from 'react';

export type DispatchStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface BoardContextProps {}

export const BoardContext = createContext<BoardContextProps>({} as BoardContextProps);
