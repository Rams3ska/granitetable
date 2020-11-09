import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/styles/auth-page.scss';

export default function AuthPage({ auth, api }) {
	const { register, handleSubmit } = useForm();

	const [outLog, setOutLog] = useState('USE LOGIN AND PASSWORD');

	const onSubmit = (data) => {
		setOutLog('');

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
				'X-Content-Type-Options': 'nosniff',
				'X-XSS-Protection': '1; mode=block',
				'X-Frame-Options': 'DENY',
				'Strict-Transport-Security': 'max-age=expireTime',
			},
			body: JSON.stringify({ Login: data.login, Password: data.password }),
		};

		fetch(`${api}/account/token`, requestOptions)
			.then((data) => data.json())
			.then((data) => {
				if (data.access_token !== undefined) {
					localStorage.setItem('access-token', data.access_token);
					auth(true);
				} else if (data.err) {
					setOutLog(data.err);
				}
			})
			.catch((err) => console.log('error: ', err));
	};

	return (
		<div className="auth-root">
			<div className="auth-container">
				<h3>АВТОРИЗАЦИЯ</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" placeholder="login" name="login" ref={register}></input>
					<input type="password" placeholder="password" name="password" ref={register}></input>
					<input type="submit" className="submit__button" value="ВОЙТИ" />
				</form>
				<div>{outLog}</div>
			</div>
		</div>
	);
}
