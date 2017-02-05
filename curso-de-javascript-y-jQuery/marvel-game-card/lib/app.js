'use strict'

var $ = window.jQuery

class MarvelApi {
  constructor (key) {
    this.key = key
    this.baseUrl = `https://gateway.marvel.com:443/v1/public`
  }

  findSeries (title) {
    var url = `${this.baseUrl}/series?title=${title}&apikey=${key}`
    if (localStorage[url]) {
      var datos = localStorage[url]
      datos = JSON.parse(datos)
      console.log('Hola desde el cache')
      return Promise.resolve(datos)
    } 
    else {
      return Promise.resolve($.get(url))
      .then((res) => {
        var datos = res.data.results[0]
        datos = JSON.stringify(datos)
        localStorage[url] = datos
        return Promise.resolve(datos)
      })
    }
    
  }

  getResourceURI (resourceURI) {
    // este metodo es muy similar al de arriba.
    // ¿Podrías crear un método interno al que llamen estos dos?
    let url = `${resourceURI}?apikey=${this.key}`

    if (localStorage[url]) {
      let datos = localStorage[url]
      datos = JSON.parse(datos)
      console.log('Hola desde el cache')
      return Promise.resolve(datos)
    }

    return Promise.resolve($.get(url))
    .then((res) => {
      let datos = res.data.results[0]
      datos = JSON.stringify(datos)
      localStorage[url] = datos
      return Promise.resolve(datos)
    })
  }

  searchCharacter (name) {
    let url = `${this.baseUrl}/characters?name=${name}&apikey${this.key}`
    return new Promise (function (done) {
      $.get(url).done(function (data) {
        done(data)
      })
    })
    .then(function () {
      debugger
    })
  }
}

// var MarvelApi = window.MarvelApi

var key = '20a5ad0598e9c03a98b03a77ab6ab9b9'
var api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => {
  let serieImage = `${serie.thumbnail.path}.${serie.thumbnail.extension}`
  $('.Layout').css('background-image', `url(${serieImage})`)
  var characters = serie.characters.items

  let promises = []

  for (let character of characters) {
    // iterar los personajes
    let promise = api.getResourceURI(character.resourceURI)
    // genera una promise por cada personaje
    promises.push(promise)
  }
  // aqui promises ya tiene un array de Promises con las peticiones para cada personaje
  return Promise.all(promises)
})
.then(characters => {
  return characters.filter((character) => {
    // return !!character.thumbnail && !!character.description
    return !!character.thumbnail
  })
})
.then((results) => {

  let characters = shuffle(results)

  for (let i = 0; i<5; i++) {
    let character = characters[i] 
    let template = renderCharacter(character)
    let $card = $(template)
    $('.Battle-player').append($card)
    $($card).on('click', function () {
      let $this = $(this)
      let attack = $this.find('.Card-attack')
      console.log(attack.data('attack'))
    })
  }
    
})
.catch((err) => {
  console.log(err)
})

$('.CharacterForm').on('submit', function (e) {
  e.preventDefault()
  let name = $(this).find('')
})


function renderCharacter (character) {

  // Genera un numero de 500 a 1000
  let attackPoints = Math.ceil(Math.random() * 500) + 500

  let template = `
    <div class="Card">
      <h2 class="Card-name">${character.name}</h2><img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="Wolverine" class="Card-image">
      <div class="Card-description">${character.description}</div>
      <div class="Card-attack" data-attack="${attackPoints}">${attackPoints} puntos de ataque</div>
    </div>
  `

  return template
}

function shuffle (arr) {
  for (var i = 0; i < arr.length; i++) {
    debugger
    let tmp = arr[i]
    let index = Math.floor(Math.random() * arr.length - 1)
    arr[i] = arr[index]
    arr[index] = tmp
  }

  return arr
}