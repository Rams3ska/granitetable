import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MainPage, AdminPage, AuthPage } from './routes';

import './App.scss';

const urlAPI = 'http://localhost:5000';

function App() {
	const [isAuth, setAuth] = useState(false);

	useEffect(() => {
		fetch(`${urlAPI}/api/auth`, { method: 'GET' })
			.then((data) => data.json())
			.then((data) => {
				setAuth(data.loggedIn);
				console.log(data.loggedIn);
			});
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<MainPage api={urlAPI} />
				</Route>
				<Route exact path="/admin">
					{isAuth ? <AdminPage api={urlAPI} /> : <Redirect to="/auth" />}
				</Route>
				<Route exact path="/auth">
					{isAuth ? (
						<Redirect to="/admin" />
					) : (
						<AuthPage
							auth={(auth) => {
								setAuth(auth);
							}}
							api={urlAPI}
						/>
					)}
				</Route>
				<Route path="*">
					<Redirect to="/"></Redirect>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
