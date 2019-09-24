const express = require('express')
const StreetArt = require('../models/StreetArt')
const Visit = require('../models/Visit')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  let userId = req.user._id
  Visit.find({ _user: userId })
    .populate('_streetArt') // Replace the field "_streetArt" by the document in the database
    .then(visits => {
      res.json(visits)
    })
    .catch(err => next(err))
})

router.post('/visits', isLoggedIn, (req, res, next) => {
  let { _streetArt } = req.body
  Visit.create({
    _user: req.user._id,
    _streetArt,
  })
    .then(createdVisit => {
      res.json(createdVisit)
    })
    .catch(err => next(err))
})

router.delete('/visits/:id', isLoggedIn, (req, res, next) => {
  Visit.findById(req.params.id).then(visit => {
    if (!visit) {
      next({
        message: 'There is no visit',
        status: 400,
      })
    } else if (visit._user.toString() !== req.user._id.toString()) {
      next({
        message: 'You cannot delete the visit',
        status: 403,
      })
    } else {
      Visit.findByIdAndDelete(req.params.id)
        .then(deletedVisit => {
          res.json({
            message: 'The visit was successfully deleted',
          })
        })
        .catch(err => next(err))
    }
  })
})

module.exports = router
