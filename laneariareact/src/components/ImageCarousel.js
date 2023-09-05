import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos CSS del carrusel
import imagen1 from '../imagenes/imagen1.png'
import imagen2 from '../imagenes/imagen2.png'
import imagen3 from '../imagenes/imagen3.png'
import imagen4 from '../imagenes/imagen4.png'
import imagen5 from '../imagenes/imagen5.png'
import '../styles/Carousel.css'

const ImageCarousel = () => {
  return (
    <Carousel className="image-container">
      <div>
        <img src={imagen1} alt="Imagen 1" />
      </div>
      <div>
        <img src={imagen2} alt="Imagen 2" />
      </div>
      <div>
        <img src={imagen3} alt="Imagen 3" />
      </div>
      <div>
        <img src={imagen4} alt="Imagen 4" />
      </div>
      <div>
        <img src={imagen5} alt="Imagen 5" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;