const mongoose = require('mongoose')

const Name = 'IndonesiaProvince'

const villageSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: String,
}).index({ name: 'text' })

const districtSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: String,
  villages: [villageSchema],
}).index({ name: 'text' })

const regencySchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: String,
  districts: [districtSchema],
}).index({ name: 'text' })

const provinceSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: String,
  regencies: [regencySchema],
}).index({ name: 'text' })

const Model = mongoose.model(Name, provinceSchema)

Model.getAllProvince = () => {
  return Model.find({}).select('name id -_id')
}

Model.getProvince = id => {
  return Model.aggregate([
    {
      $match: { id },
    },
    {
      $project: {
        name: '$name',
        id: '$id',
        regencies: {
          $map: {
            input: '$regencies',
            as: 'regencies',
            in: {
              id: '$$regencies.id',
              name: '$$regencies.name',
            },
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          name: '$name',
          id: '$id',
          regencies: '$regencies',
        },
      },
    },
  ])
}

Model.getRegency = id => {
  return Model.aggregate([
    {
      $unwind: '$regencies',
    },
    {
      $match: {
        'regencies.id': id,
      },
    },
    {
      $project: {
        name: '$regencies.name',
        id: '$regencies.id',
        province: {
          id: '$id',
          name: '$name',
        },
        districts: {
          $map: {
            input: '$regencies.districts',
            as: 'districts',
            in: {
              id: '$$districts.id',
              name: '$$districts.name',
            },
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          name: '$name',
          id: '$id',
          province: '$province',
          districts: '$districts',
        },
      },
    },
  ])
}

Model.getDistrict = id => {
  return Model.aggregate([
    {
      $unwind: '$regencies',
    },
    {
      $unwind: '$regencies.districts',
    },
    {
      $match: {
        'regencies.districts.id': id,
      },
    },
    {
      $project: {
        name: '$regencies.districts.name',
        id: '$regencies.districts.id',
        province: {
          id: '$id',
          name: '$name',
        },
        regency: {
          id: '$regencies.id',
          name: '$regencies.name',
        },
        villages: {
          $map: {
            input: '$regencies.districts.villages',
            as: 'villages',
            in: {
              id: '$$villages.id',
              name: '$$villages.name',
            },
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          name: '$name',
          id: '$id',
          province: '$province',
          regency: '$regency',
          villages: '$villages',
        },
      },
    },
  ])
}

Model.getVillage = id => {
  return Model.aggregate([
    {
      $unwind: '$regencies',
    },
    {
      $unwind: '$regencies.districts',
    },
    {
      $unwind: '$regencies.districts.villages',
    },
    {
      $match: {
        'regencies.districts.villages.id': id,
      },
    },
    {
      $project: {
        name: '$regencies.districts.villages.name',
        id: '$regencies.districts.villages.id',
        district: {
          id: '$regencies.districts.id',
          name: '$regencies.districts.name',
        },
        regency: {
          id: '$regencies.id',
          name: '$regencies.name',
        },
        province: {
          id: '$id',
          name: '$name',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          name: '$name',
          id: '$id',
          province: '$province',
          regency: '$regency',
          district: '$district',
        },
      },
    },
  ])
}

module.exports = Model
module.exports.Name = Name
