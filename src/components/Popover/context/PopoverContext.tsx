import { createContext } from 'react';
import { PopoverContextProps } from '../../../interfaces';

export const PopoverContext = createContext<PopoverContextProps>({} as PopoverContextProps);
