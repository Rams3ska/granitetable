import React, { useEffect, useRef, useState } from 'react';
import { Container, Toolbar } from '@material-ui/core';
import Image_1 from './assets/img/1231414.png';
import Gallery from './components/Gallery.jsx';
import Aboutcard from './components/AboutCard';
import GalleryPopup from './components/GalleryPopup';
import FormPopup from './components/FormPopup';
import listImg from './assets/list.svg';
// import WaveVector from './components/WaveVector.jsx';
// import Gallery from './components/Gallery.jsx';
import './App.scss';

function App() {
	const navItems = [
		{
			name: 'О НАС',
			click: () => {
				scrollToRef(aboutUsRef);
			},
		},
		{
			name: 'НАШИ ИЗДЕЛИЯ',
			click: () => {
				setGalleryPopup(!galleryPopup);
			},
		},
		{
			name: 'КОНТАКТЫ',
			click: () => {
				scrollToRef(footerRef);
			},
		},
		{
			name: 'ОСТАВИТЬ ЗАЯВКУ',
			click: () => {
				setFormPopup(!formPopup);
			},
		},
	];

	const [galleryPopup, setGalleryPopup] = useState(false);
	const [formPopup, setFormPopup] = useState(false);
	const [navPopup, setNavpopup] = useState(true);
	const [userFormLog, setUserFormLog] = useState('');
	const [captcha, setCaptcha] = useState(null);
	const [images, setImages] = useState([]);

	const aboutUsRef = useRef(null);
	const footerRef = useRef(null);

	const imgUrl = 'http://localhost:5000/gallery/';

	useEffect(() => {
		fetch('http://localhost:5000/api/images/get')
			.then((res) => res.json())
			.then((result) => {
				result.images.forEach((x) => {
					setImages((old) => [...old, imgUrl + x]);
				});
			});
	}, []);

	// const importAll = (r) => r.keys().map(r);
	// const images = importAll(require.context('./assets/gallery', false, /\.(png|jpe?g|svg)$/));

	const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth' });

	const onFormSubmited = async (order) => {
		if (!captcha) {
			setUserFormLog('ОШИБКА! ПРОЙДИТЕ КАПТЧУ');
			return;
		}

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		};
		const response = await fetch('http://localhost:5000/api/orders/create', requestOptions);
		const data = await response.json();

		// console.log(order);
		if (!data.error) {
			setTimeout(() => {
				setFormPopup(false);
			}, 2000);
		}

		setUserFormLog(data.message);
	};

	return (
		<div className="App">
			{galleryPopup && (
				<GalleryPopup
					onDisable={() => {
						setGalleryPopup(!galleryPopup);
					}}
					images={images}
				/>
			)}
			{formPopup && (
				<FormPopup
					onDisable={() => {
						setFormPopup(!formPopup);
					}}
					onUpdateForm={(data) => {
						onFormSubmited(data);
					}}
					outLog={userFormLog}
					sendCaptcha={(value) => {
						setCaptcha(value);
					}}
				></FormPopup>
			)}
			<Toolbar className="nav-bar content-padding">
				<span className="site-logo">♂ КАМЕННЫЙ КАМЕНЬ ♂</span>
				<span className="nav-container">
					<div
						className="nav-popup__button"
						onClick={() => {
							setNavpopup(!navPopup);
						}}
					>
						<img src={listImg} alt="img"></img>
					</div>

					{navItems.map((x) => (
						<span className="nav-button" onClick={x.click} key={x.name}>
							{x.name}
						</span>
					))}
				</span>
			</Toolbar>
			<div className="nav-popup" style={{ visibility: navPopup ? 'hidden' : 'visible' }}>
				{navItems.map((x) => (
					<span
						className="nav-popup__item"
						onClick={() => {
							x.click();
							setNavpopup(true);
						}}
						key={x.name}
					>
						{x.name}
					</span>
				))}
			</div>
			<Container maxWidth={false} className="main-container" disableGutters={true}>
				<section className="info content-padding">
					<div className="info__block_left">
						<h1>О НАШИХ КАМНЯХ</h1>
						<div className="about__text">
							<p>В отличие от бездушного булыжника, наши камни созданы по секретным технологиям древних инков.</p>
							<p>Инки строили из этих камней Мачу-Пикчу, а мы построим из них прекрасный интерьер в вашем доме.</p>
							<p>
								Гарантом качества нашей продукции выступает тот факт, что камень по своей природе не имеет срока годности. Даже если вам надоест
								каменное изделие в вашем интерьере, вы сможете повторно использовать его, например в качестве надгробия вашего родственника.
							</p>
							<p>
								Наше нахождение на рынке исчисляется десятилетием, а следовательно нам давно известно, чего хотят наши клиенты. И мы готовы им
								это дать.
							</p>
						</div>
					</div>
					<div className="info__block_right">
						<img src={Image_1} alt="img" />
					</div>
				</section>
				<section className="gallery">
					<Gallery images={Array.from(images).splice(0, 10)} />
				</section>
				<section className="about-company content-padding" ref={aboutUsRef}>
					<h1>О НАС</h1>
					<section>
						<Aboutcard
							name="О КОМПАНИИ"
							text={
								'Наша компания успешно продает камни уже 12 лет.\n\nТех.процесс производства четко выверен и скорректирован десятками ученых из Гарварда.\n\nМы насчитываем в своей базе уже более 1.000.000 клиентов и это только в городе Ижевск. В остальных городах наша база насчитывает около двух миллиардов довольных клиентов.'
							}
						/>
						<Aboutcard
							name="ГАРАНТИЯ"
							text={
								'Благодаря идеальному тех.процессу производства, коэффициент брака наших изделий - 1:10^200.\n\nКаждая гранула нашего материала отбирается десятками китайских детей в подвалах нашего прекрасного города Ижевск.\n\nЕсли Вы, будучи нашим клиентом, останетесь недовольны - мы с радостью выиграем ваши иски в суд против нас и заставим выплатить Вас огромную компенсацию в нашу пользу.'
							}
						/>
						<Aboutcard
							name="ДОСТАВКА"
							text={
								'Так как мы являемся компанией мирового масштаба, нам до глубины души все равно, как вы будите тащить эти монолитные глыбы к себе домой, так как наша великая компания не обязана развозить наши драгоценные камни по вашим халупам.\n\nВся ответственность за перевозки лежит только на ваших сильных плечах, на которых вы понесете наши прекрасные изделия себе домой.'
							}
						/>
					</section>
				</section>
				<footer ref={footerRef}>
					<div className="footer__content content-padding">
						<div className="booter">
							<span className="booter__name" style={{ marginBottom: '4px' }}>
								КОНТАКТЫ
							</span>
							<div className="booter__content" style={{ whiteSpace: 'pre-line' }}>
								{'Адрес: г.Ижевск, ул.Кирова, д.130а\nКонтактный номер: +7-999-666-33-33\neMail: ganitetables@gmail.com'}
							</div>
						</div>
					</div>
				</footer>
			</Container>
		</div>
	);
}

export default App;
