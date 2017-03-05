'use strict'

module.exports = {
  // El primer archivo que va a leer webpack.
  entry: './source/server.js',
  // Donde Webpack va a dejar los archivos.
  output: {
    filename: 'index.js',
    path: './built/server',
  },

  // Los modulos nos permiten hacer cosas.
  module: {
    // Los loaders son formas que webpack puede tomar cierto tipo de archivos y procesarlos
    // de una forma en particular.
    rules: [
      {
        // Si el archivo es .json
        test: /\.json$/,
        // Va a utilizar el loader json.
        loader: 'json-loader',
      },
      {
        // Si el archivo es .jsx o .js (? le dice que la x es opcional).
        test: /\.jsx?$/,
        // Usar el loader babel.
        loader: 'babel-loader',
        // Le decimos que excluya los node_modules puesto que ellos ya estan hechos
        // de manera que funcionen con ES2015 por lo que no necesitamos usar babel.
        exclude: /{node_modules}/,
        // Le pasamos la informacion de como configurar babel.
        query: {
          // Los presets en babel son conjunto de plugins.
          presets: [
            // Detecta las caracteristicas de ES2015, ES2016 y ES2017
            // que soporta la version oficial de Node que estamos utilizando
            // y solamente agrega los plugins para convertir lo que no funcione.
            'latest-minimal',
            // Nos da soporte a JSX.
            'react'
          ]
        }
      }
    ]
  },
  // Nos permite usar los modulos nativos de Node.
  target: 'node'
}
