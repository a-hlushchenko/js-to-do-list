const express = require('express')
const router = express.Router()

const Test = require('../class/test')

router.get('/', function (req, res) {
  res.render('index', {
    name: 'index',
    component: ['heading'],

    title: 'Назва сторінки',
    data: {
      test: new Test().test,
    },
  })
})

module.exports = router
