import React from 'react';
import '../assets/styles/loader.css';

export default function Loader() {
	return (
		<div className="loader-container">
			<div className="lds-roller">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
