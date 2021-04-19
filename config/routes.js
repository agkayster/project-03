const router = require('express').Router()
const plotsController = require('../controllers/plots')
const plantsController = require('../controllers/plants')
const authController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

// app.get('/') - define a GET request handler for the homepage: EXPRESS
router.get('/', (req, res) => {
  // res.json() - send back a JSON response: EXPRESS
  res.json({ message: 'Hello World!' })
})

// plots INDEX & CREATE route handlers: EXPRESS
router.route('/plots')
  .get(plotsController.index)
  .post(secureRoute, plotsController.create)

// plants INDEX route handler: EXPRESS
router.route('/plants')
  .get(plantsController.index)

// plants SHOW route handler: EXPRESS
router.route('/plants/:id')
  .get(plantsController.show)

// plots SHOW, UPDATE & DELETE route handlers: EXPRESS
router.route('/plots/:id')
  .get(plotsController.show)
  .put(secureRoute, plotsController.update)
  .delete(secureRoute, plotsController.delete)

router.post('/plots/:id/comments', secureRoute, plotsController.commentCreate)
router.delete('/plots/:id/comments/:commentId', secureRoute, plotsController.commentDelete)

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
