// server/routes/street-arts.js
const express = require('express')
const StreetArt = require('../models/StreetArt')
const router = express.Router()
const uploader = require('../configs/cloudinary')

// GET /api/street-arts
router.get('/', (req, res, next) => {
  StreetArt.find().then(streetArts => {
    res.json(streetArts)
  })
})

// GET /api/street-arts/:id
router.get('/:id', (req, res, next) => {
  StreetArt.findById(req.params.id)
    .then(streetArt => {
      res.json(streetArt)
    })
    .catch(err => {
      next({ message: 'No Street Art', status: 400 }) // Go to the next error middleware (at the end of app.js)
    })
})

// POST /api/street-arts
// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url

  StreetArt.create({
    pictureUrl,
    location: {
      coordinates: [lng, lat],
    },
  })
    .then(createdStreetArt => {
      res.json(createdStreetArt)
    })
    .catch(err => next(err))
})

module.exports = router
