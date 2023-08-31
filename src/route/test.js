const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    name: 'index',
    component: ['heading'],

    title: 'to-do list',
    data: {},
  })
})

module.exports = router
