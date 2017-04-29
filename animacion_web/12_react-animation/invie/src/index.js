import React from 'react';
import ReactDOM from 'react-dom';
import cheet from 'cheet.js'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Invie from './Invie';
import './css/invie.css';
import './css/animations.css';

import logoPortada from './images/invie.png'
import acustica from './images/invie-acustica.png'
import classic from './images/invie-classic.png'
import easterA from './images/easter-a.png'
import easterB from './images/easter-b.png'

const initialState = {
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

const easter = {
  menu: [
    { href: 'index.html', title: 'Home' },
  ],
  guitarras: [
    {
      image: easterA,
      alt: 'Guitarra Padre de familia',
      name: 'Invie Familiar',
      features: [
        'Listo para copiar a los Simpsons',
        'Aire puro',
        'Chistes malos',
      ],
    },
    {
      image: easterB,
      alt: 'Guitarra Invie ',
      name: 'Invie Anime',
      features: [
        'Estilo vintage',
        'Liviana',
        'Empieza tu camino como rockstar',
      ],
    },
  ]
}

const store = createStore(reducer, initialState)

function reducer (state, action) {
  switch (action.type) {
    case 'UPDATE_PROPS':
      const newProps = action.payload.props
      return { ...state, ...newProps }
    default:
      return state
  }
}

cheet('i n v i e', () => {
  // console.log('Lo lograste, descubriste el easter egg')
  store.dispatch({
    type: 'UPDATE_PROPS',
    payload: {
      props: easter,
    }
  })
})

cheet('g o b a c k', () => {
  // console.log('Regresaste al estado inicial')
  store.dispatch({
    type: 'UPDATE_PROPS',
    payload: {
      props: initialState,
    }
  })
})

ReactDOM.render(
  <Provider store={store}>
    <Invie  />
  </Provider>,
  document.getElementById('root')
);
