const mongoose = require('mongoose')
require('../models')
const Indonesia = require('../models/IndonesiaProvince')
mongoose.connection.on('open', async () => {
  // 31 Jakarta
  const result = await Indonesia.getAllProvince()

  console.log(JSON.stringify(result, null, 2))
  mongoose.connection.close()
})
