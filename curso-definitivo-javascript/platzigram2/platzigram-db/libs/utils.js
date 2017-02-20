'use strict'

const utils = {
  extractTags
}

function extractTags (text) {
  // si el null o undefined
  if (text == null) return []

  // matcheamos todos los tags del texto
  let matches = text.match(/#(\w+)/g)

  // si hay texto pero ningun match (ningun tag)
  if (matches === null) return []

  // si todo va bien devolvemos los tags
  matches = matches.map(tag => {
    return normalize(tag)
  })

  return matches
}

function normalize (text) {
  text = text.toLowerCase()
  text = text.replace(/#/g, '')
  return text
}

module.exports = utils
