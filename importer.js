const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
require('./models')
const IndonesiaProvince = require('./models/IndonesiaProvince')

mongoose.connection.on('open', () => init())

const init = async () => {
  const data = JSON.parse(fs.readFileSync('./indonesia.json').toString())
  console.log('Initializing something dramatically !')
  try {
    await IndonesiaProvince.insertMany(data)
  } catch (e) {
    console.error(e)
  }
  console.log("WHOOPS that's all folks!")
  mongoose.connection.close()
}
