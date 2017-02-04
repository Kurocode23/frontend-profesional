'use strict'

let $ = window.jQuery

class MarvelApi {
  constructor (key) {
    this.key = key
    this.baseUrl = `https://gateway.marvel.com:443/v1/public`
  }

  findSeries (title) {
    let url = `${this.baseUrl}/series?title=${title}&apikey=${key}`
    return Promise.resolve($.get(url))
    .then((res) => {
      return res.data.results[0]
    })
  }
}

window.MarvelApi = MarvelApi