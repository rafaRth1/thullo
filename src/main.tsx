import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, AuthProvider } from './context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<AppProvider>
					<App />
				</AppProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
