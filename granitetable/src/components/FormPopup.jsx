import React, { useState } from 'react';
import PopupContainer from './Popup';
import ReCAPTCHA from 'react-google-recaptcha';
import '../assets/styles/form-popup.scss';
import { useForm } from 'react-hook-form';

export default function FormPopup({ onDisable, onUpdateForm, outLog, sendCaptcha }) {
	const { register, handleSubmit, errors } = useForm();

	const [activeCaptcha, setActiveCaptcha] = useState(null);

	const onSubmit = (data) => {
		onUpdateForm(data);
	};

	const content = (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>ЗАПОЛНИТЕ ФОРМУ</h2>
			<div className="form__main">
				<input
					type="text"
					placeholder="Имя"
					name="name"
					className={errors.name && 'error'}
					ref={register({ required: true, maxLength: 32, pattern: /^[a-zA-Zа-яА-Я]{1,32}$/ })}
				/>
				<input
					type="text"
					placeholder="Фамилия"
					name="surname"
					className={errors.surname && 'error'}
					ref={register({ required: true, maxLength: 32, pattern: /^[a-zA-Zа-яА-Я]{1,32}$/ })}
				/>
			</div>
			<div className="form__contact">
				<input
					type="text"
					placeholder="E-Mail"
					name="email"
					className={errors.email && 'error'}
					ref={register({
						required: true,
						pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm /* eslint-disable-line */,
					})} /* eslint-disable-line */
				/>
				<input
					type="text"
					placeholder="Номер телефона"
					name="phone"
					className={errors.phone && 'error'}
					ref={register({ required: true, minLength: 11, maxLength: 12, pattern: /^((\+7|7|8)+([0-9]){10})$|\b\d{3}[-.]?\d{3}[-.]?\d{4}$/ })}
				/>
			</div>
			<div>
				<textarea placeholder="Какие-либо пожелания.." name="comment" ref={register}></textarea>
			</div>
			<span className="out-log">{outLog}</span>
			<div className="submit-container">
				<input type="submit" className="submit__button" value="ОТПРАВИТЬ ЗАЯВКУ" />
			</div>
			<div style={activeCaptcha ? { contentVisibility: 'hidden', justifyContent: 'center' } : { contentVisibility: 'visible', justifyContent: 'center' }}>
				<ReCAPTCHA
					sitekey="6LdvF90ZAAAAAJ_NenQSJU2y6G2JJO5DrUZ6DvRT"
					onChange={(val) => {
						sendCaptcha(val);
						setActiveCaptcha(val);
					}}
				/>
			</div>
		</form>
	);
	return <PopupContainer onDisable={onDisable} content={content} width={600} />;
}
