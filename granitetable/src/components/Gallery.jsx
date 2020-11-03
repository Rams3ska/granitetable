import React from 'react';
import Carousel from 'react-material-ui-carousel';

function Gallery({ images }) {
	return (
		<Carousel autoPlay={false} className="carousel" animation="slide" indicators={false}>
			{images.map((item, i) => (
				<img src={item} key={i} alt="img" className="gallery__image"></img>
			))}
		</Carousel>
	);
}
export default Gallery;
