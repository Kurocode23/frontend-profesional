'use strict'

module.exports = {
  // El primer archivo que va a leer webpack.
  entry: './source/client.js',
  // Donde Webpack va a dejar los archivos.
  output: {
    filename: 'app.js',
    path: './built/statics',
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
            'es2016',
            'es2017',
            // Nos da soporte a JSX.
            'react'
          ],
          plugins: [
            'transform-es2015-modules-commonjs'
          ]
        }
      }
    ]
  },
  // Nos permite usar los modulos nativos de Node.
  target: 'web'
}
