import { createContext } from 'react';

interface TaskcardPros {}

export const TaskcardContext = createContext<TaskcardPros>({} as TaskcardPros);
