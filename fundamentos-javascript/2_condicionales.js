const starWars7 = 'Star Wars: El Despertar de la Fuerza'
const pgStarwars7 = 13

const nameSacha = 'Sacha'
const ageSacha = 26

const nameSanti = 'Santi'
const ageSanti = 12

function canwatchStarWars7 (name, age, isWithAdult = false) {
  if (age >= pgStarwars7) {
    console.log(`${name} puede pasar a var ${starWars7}`)
  } else if (isWithAdult) {
    console.log(`${name} puede pasar a ver ${starWars7}.
    Aunque su edad es ${age}, se encuentra acompaniada/o por un adulto`)
  } else {
    console.log(`${name} no puede pasar a ver ${starWars7}.
    Tiene ${age} anios y necesita tener ${pgStarwars7}`)
  }

}

canwatchStarWars7(nameSacha, ageSacha)
canwatchStarWars7(nameSanti, ageSanti, true)

starWars7 = 'Star Wars: The Force Awakening'
