import React from 'react';
import '../styles/Footer.css'; // Asegúrate de tener un archivo CSS para estilizar el pie de página.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
            <h3>Nuestra empresa</h3>
            <a href="/informacion">Quienes somos?</a>
        </div>
        <div>
            <h3>Contactar</h3>
            <a href="/ayuda">Ayuda</a>
            <a href="/contacto">Contacto</a>
        </div>
      </div>
      <div className="footer-info">
        &copy; 2023 LANEARIA | Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
