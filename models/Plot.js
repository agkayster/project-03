const mongoose = require('mongoose')
const axios = require('axios')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: false, maxlength: 380 },
  rating: { type: Number, min: 1, max: 5, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const plotSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a {PATH}', unique: true },
  description: { type: String, required: 'Please provide a {PATH}'},
  plotType: { type: String, required: 'Please specify what type of plot this is', enum: ['Allotment', 'Private Plot', 'Community Garden'] },
  image: { type: String, required: 'Please provide an image of the plot' },
  streetAddress: { type: String, required: 'Please provide the street address of the plot' },
  postCode: { type: String, required: 'Please provide a post code' },
  latitude: { type: Number, required: 'Could not find your {PATH}' },
  longitude: { type: Number, required: 'Could not find your {PATH}' },
  numOfSlots: {type: Number},
  slotsAvailable: {type: Boolean, default: false},
  bioWasteAccepted: {type: Boolean, default: false},
  facilities: { type: [String], required: 'Please provide a list of facilities' },
  costInvolved: {type: Boolean, default: false},
  costPerAnnum: {type: Number},
  conditionsForUse: {type: [String]},
  volunteer: {type: Boolean, default: false},
  comments: [ commentSchema ],
  primaryContactName: {type: String, required: 'Please provide the name of the primary contact'},
  primaryContactEmail: {type: String, required: 'Please provide the email address of the primary contact'},
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  toJSON: { virtuals: true }
})

plotSchema.virtual('averageRating')
  .get(function getAverageRating() {
    if(this.comments.length === 0) return 0
    return this.comments.reduce((total, comment) => comment.rating + total, 0) / this.comments.length
  })

plotSchema.pre('validate', function getGeolocation(done) {
  if(!this.isModified('postCode')) return done()

  axios.post('https://postcodes.io/postcodes?filter=longitude,latitude', { postcodes: [this.postCode] })
    .then((res) => {
      if(!res.data.result[0].result) {
        this.invalidate('postCode', 'Invalid post code')
        return done()
      }
      const { latitude, longitude } = res.data.result[0].result
      this.latitude = latitude
      this.longitude = longitude

      done()
    })
})


module.exports = mongoose.model('Plot', plotSchema)
