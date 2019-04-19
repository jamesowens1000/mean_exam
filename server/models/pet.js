var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var PetSchema = new mongoose.Schema({
    name: {type: String, minlength: [3,"Name must be at least 3 characters!"], unique: [true, "Name must be unique!"]},
    type: {type: String, minlength: [3,"Type must be at least 3 characters!"]},
    desc: {type: String, minlength: [3,"Description must be at least 3 characters!"]},
    skill1: {type: String},
    skill2: {type: String},
    skill3: {type: String},
    likes: {type: Number}
}, {timestamps: true});

PetSchema.plugin(uniqueValidator);

var Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;