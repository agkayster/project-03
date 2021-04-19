const Plant = require('../models/Plant')

function indexRoute(req, res, next) {
  // get all the plants from the database: MONGOOSE
  Plant.find(req.query)
    .then(plants => res.json(plants)) // send them as JSON: EXPRESS
    .catch(next)
}

function showRoute(req, res, next) {
  // the ID is now on req.params.id
  Plant.findById(req.params.id) // get the plant from the database: MONGOOSE

    .then(plant => {
      if(!plant) return res.sendStatus(404) // return a 404: EXPRESS

      return res.json(plant) // send it as JSON: EXPRESS
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
