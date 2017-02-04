'use strict'

var $ = window.jQuery

class MarvelApi {
  constructor (key) {
    this.key = key
    this.baseUrl = `https://gateway.marvel.com:443/v1/public`
  }

  findSeries (title) {
    var url = `${this.baseUrl}/series?title=${title}&apikey=${key}`
    return Promise.resolve($.get(url))
    .then((res) => {
      return res.data.results[0]
    })
  }

  getResourceURI (resourceURI) {
    // este metodo es muy similar al de arriba.
    // ¿Podrías crear un método interno al que llamen estos dos?
    let url = `${resourceURI}?apikey=${this.key}`

    return Promise.resolve($.get(url))
    .then((res) => {
      let datos = res.data.results[0]
      return Promise.resolve(datos)
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
  $('.Card').each((i, item) => {
    let character = results[i]
    let $this = $(item)
    let $image = $this.find('.Card-image')
    let $description = $this.find('.Card-description')
    let $name = $this.find('.Card-name')

    $image.attr('src', `${character.thumbnail.path}.${character.thumbnail.extension}`)
    $name.text(character.name)
    $description.text(character.description)
  })
})
.catch((err) => {
  console.log(err)
})
