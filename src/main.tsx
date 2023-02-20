import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AppProvider } from './context';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<AppProvider>
						<App />
					</AppProvider>
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
