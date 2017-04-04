const dobles = (...numeros) => numeros.map(numero => numero * 2)

suma(4, 8, 8954, 7, 9)
dobles(2, 4, 6)
pares(2, 3, 6, 9)

function suma (...nums) {
  const resultado = nums.reduce(function (acumulador, numero) {
    return acumulador += numero
  })

  return console.log(resultado)
}

function pares (...numeros) {
  return numeros.filter(numero => numero % 2 === 0)
}
