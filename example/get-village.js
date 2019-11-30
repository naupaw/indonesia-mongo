const mongoose = require('mongoose')
require('../models')
const Indonesia = require('../models/IndonesiaProvince')
mongoose.connection.on('open', async () => {
  // 3173010006 Tanjung duren
  const result = await Indonesia.getVillage(3174040001)

  console.log(JSON.stringify(result, null, 2))
  mongoose.connection.close()
})
