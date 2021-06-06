const Plant = require('../models/Plant')

function indexRoute(req, res, next) {
  // get all the plants from the database: MONGOOSE
  Plant.find(req.query)
    .then((plants) => res.json(plants)) // reload the INDEX page with all the plants
    .catch(next)
}

function showRoute(req, res, next) {
  // the ID is now on req.params.id
  Plant.findById(req.params.id) // get the plant from the database: MONGOOSE

    .then((plant) => {
      if (!plant) return res.sendStatus(404) // return a 404: NOT FOUND

      return res.json(plant) // reload the SHOW page with the particular plant
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
