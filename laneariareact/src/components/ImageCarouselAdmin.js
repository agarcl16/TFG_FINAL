import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos CSS del carrusel
import imagen1 from '../imagenes/imagen6.png'
import imagen2 from '../imagenes/imagen7.png'
import imagen3 from '../imagenes/imagen8.png'
import '../styles/Carousel.css'

const ImageCarouselAdmin = () => {
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
    </Carousel>
  );
};

export default ImageCarouselAdmin;