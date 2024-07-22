import './App.css';
import { AppRouter } from './router/app-router';

function App() {
	return (
		<div className='app flex flex-col h-[100dvh]'>
			<AppRouter />
		</div>
	);
}

export default App;
