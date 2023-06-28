import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, AuthProvider } from './context';
import './index.css';

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
