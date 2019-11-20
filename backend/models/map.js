const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
   spotId: {type:String, required: true},
   status: {type: String, required: true}
});


module.exports = mongoose.model('Map', mapSchema, 'maps');

