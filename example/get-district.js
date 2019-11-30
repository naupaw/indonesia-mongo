const mongoose = require('mongoose')
require('../models')
const Indonesia = require('../models/IndonesiaProvince')
mongoose.connection.on('open', async () => {
  // 3174040 Grogol Petamburan
  const result = await Indonesia.getDistrict(3174040)

  console.log(JSON.stringify(result, null, 2))
  mongoose.connection.close()
})
