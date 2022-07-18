import Input from './components/Input';
import { Routes, Route } from 'react-router-dom';
import AccountDetails from './components/AccountDetails';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Input />}></Route>
				<Route path='/account-details' element={<AccountDetails />}></Route>
			</Routes>
		</>
	);
}

export default App;
