const mongoose = require('mongoose')
require('../models')
const Indonesia = require('../models/IndonesiaProvince')
mongoose.connection.on('open', async () => {
  // 3173 Jakarta Pusat
  const result = await Indonesia.getRegency(3174)

  console.log(JSON.stringify(result, null, 2))
  mongoose.connection.close()
})
