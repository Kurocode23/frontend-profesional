import React, { Component } from 'react';

import logoPortada from './images/invie.png'
import acustica from './images/invie-acustica.png'
import classic from './images/invie-classic.png'
import './css/invie.css';
import Portada from './components/Portada.jsx'
import Guitarras from './components/Guitarras.jsx'
import Footer from './components/Footer.jsx'

const data = {
  logoPortada,
  menu: [
    { href: 'index.html', title: 'Home' },
    { href: '#guitarras', title: 'Guitarras' },
    { href: 'precios.html', title: 'Precios' },
  ],
  guitarras: [
    {
      image: acustica,
      alt: 'Guitarra Invie Acustica',
      name: 'Invie Acustica',
      features: [
        'Estilo vintage',
        'Madera pura',
        'Incluye estuche invisible de aluminio',
      ],
    },
    {
      image: classic,
      alt: 'Guitarra Invie Classic',
      name: 'Invie Classic',
      features: [
        'Estilo vintage',
        'Liviana',
        'Empieza tu camino como rockstar',
      ],
    },
  ]
}

class Invie extends Component {
  render() {
    return (
      <div className="Invie">
        {/* Portada */}
        <Portada logo={data.logoPortada} menu={data.menu} />
        {/* Guitarras */}
        <Guitarras guitarras={data.guitarras} />
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default Invie;
