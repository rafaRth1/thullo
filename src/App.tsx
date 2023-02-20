import './App.css';
import { useProvider } from './hooks';
import { AppRouter } from './router/AppRouter';

function App() {
	return (
		<div className={`App relative flex flex-col min-h-screen`}>
			<AppRouter />
		</div>
	);
}

export default App;
