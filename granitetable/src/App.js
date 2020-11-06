import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MainPage, AdminPage, AuthPage } from './routes';

import './App.scss';

const urlAPI = 'http://localhost:50114/api';

function App() {
	const [isAuth, setAuth] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('access-token')) {
			const requestOptions = {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('access-token'),
				},
				redirect: 'follow',
			};

			fetch(`${urlAPI}/values/getlogin`, requestOptions)
				.then((response) => response.json())
				.then((result) => {
					setAuth(result.isLoggin);
				})
				.catch((error) => {
					console.log('getloginerror', error);

					localStorage.removeItem('access-token');

					setAuth(false);
				});
		}
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
