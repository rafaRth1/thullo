import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { NextUIProvider } from '@nextui-org/react';
import { AppProvider, AuthProvider } from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<AuthProvider>
					<NextUIProvider>
						<App />
					</NextUIProvider>
				</AuthProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
