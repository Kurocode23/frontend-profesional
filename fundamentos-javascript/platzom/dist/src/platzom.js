'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = platzom;
function platzom(str) {
  var translation = str;

  // Si la palabra original es un palindromo, ninguna regla anterior 
  // y se devuelve la misma palabra intercalando mayusculas y minusculas
  var reverse = function reverse(str) {
    return str.split('').reverse().join('');
  };

  function minMay(str) {
    var size = str.length;
    var translation = '';
    var capitalize = true;

    for (var i = 0; i < size; i++) {
      var char = str.charAt(i);
      translation += capitalize ? char.toUpperCase() : char.toLowerCase();
      capitalize = !capitalize;
    }

    return translation;
  }

  if (str === reverse(str)) {
    return minMay(str);
  }

  // Si la palabra termina en "ar" se le quitan estos dos caracteres.
  if (str.toLowerCase().endsWith('ar')) {
    translation = str.slice(0, -2);
  }

  // Si la plabra inicia con Z, se le anade "pe" al final
  if (str.toLowerCase().startsWith('z')) {
    translation += 'pe';
  }

  // Si la palabra traducida tiene o mas letras
  // se debe partir a la mitad y unir con un guion del medio.
  var size = translation.length;

  if (translation.length >= 10) {
    var firstHalf = translation.slice(0, Math.round(size / 2));
    var secondHalf = translation.slice(Math.round(size / 2));

    translation = firstHalf + '-' + secondHalf;
  }

  return translation;
}