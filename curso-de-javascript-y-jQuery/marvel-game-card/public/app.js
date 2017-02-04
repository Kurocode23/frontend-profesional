var $ = window.jQuery
var key = 'apikey=20a5ad0598e9c03a98b03a77ab6ab9b9'
var url = 'https://gateway.marvel.com:443/v1/public/series?title=avengers&' + key

Promise.resolve($.get(url))
.then(function (results) {
  var characters = results.data.results[0].characters.items  
  var charactersArray = characters.map(function (character) {
    var char = character.resourceURI + '?' + key
    return Promise.resolve($.get(char))
  })

  return Promise.all(charactersArray)
})
.then(function (chars) {
  debugger
})
.catch(function (err) {
  debugger
  console.log(err)
})





















