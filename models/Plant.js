const mongoose = require('mongoose')


const plantSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a {PATH}', unique: true },
  image: {type: String, required: 'Please provied an image'},
  daysToMaturation: {type: Number, required: 'Please provide the number of days this plant will need to mature'},
  germination: { type: Number, required: 'Please provide the number of days this plant will need to germinate'},
  potSize: { type: Number, required: 'Please provide the size of pot required'},
  spacing: { type: Number, required: 'Please provide the space between plants required in cm'},
  sowUnderGlass: { type: Boolean, required: 'Please specify if plant can be sown under glass' },
  sowUnderDirectSunlight: { type: Boolean, required: 'Please specify if plant can be sown in area subject to direct sunlight' },
  propagator: { type: Boolean, required: 'Please specify if propogator required' },
  seedPeriod: { type: [String],  required: 'Please specify in which months seeds can be planted' },
  harvestPeriod: { type: [String], required: 'Please specify in which months plants can be harvested' },
  destroyedBy: {type: [String], required: 'Please list which pests can destroy this plant'}
})

module.exports = mongoose.model('Plant', plantSchema)
