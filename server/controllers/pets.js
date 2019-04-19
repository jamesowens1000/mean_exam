var mongoose = require('mongoose');
require('../models/pet');

var Pet = mongoose.model('Pet');

module.exports = {
    all_pets: function(req,res){
        Pet.find({}, function(err,pets){
            if(err){
                console.log('Error: Failed to retrieve all pets!');
                res.json({message: "Error", error: err});
            } else {
                console.log('Success: Retrieved all pets!');
                res.json({pets});
            }
        }).sort({"type": 1});
    },
    find_pet: function(req,res){
        Pet.findOne({_id: req.params.id}, function(err,pet){
            if(err) {
                console.log('Error: Failed to retrieve pet w/ id: '+req.params.id);
                res.json({message: "Error", error: err});
            } else {
                console.log('Success: Retrieved pet w/ id: '+req.params.id);
                res.json({pet});
            }
        })
    },
    add_pet: function(req,res){
        var pet = new Pet({name: req.body.name, type: req.body.type, desc: req.body.desc, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3, likes: 0});

        pet.save(function(err){
            if(err){
                console.log('Error: Failed to add a new pet!');
                res.json({message: "Error", error: err});
            } else {
                console.log('Success: Added a pet!');
                res.json({message: "Success"});
            }
        })
    },
    upd_pet: function(req,res){
        Pet.findOne({_id: req.params.id}, function(err, pet){
            pet.name = req.body.name;
            pet.type = req.body.type;
            pet.desc = req.body.desc;
            pet.skill1 = req.body.skill1;
            pet.skill2 = req.body.skill2;
            pet.skill3 = req.body.skill3;
            pet.likes = req.body.likes;
            pet.save(function(err){
                if(err){
                    console.log('Error: Failed to update a pet!');
                    res.json({message: "Error", error: err});
                } else {
                    console.log('Success: Updated a pet!');
                    res.json({message: "Success"});
                }
            })
        })
    },
    del_pet: function(req,res){
        Pet.findOneAndDelete({_id: req.params.id}, function(err,pet){
            if(err) {
                console.log('Error: Failed to remove a pet!');
                res.json({message: "Error", error: err});
            } else {
                console.log('Success: Removed a pet!');
                res.json({message: "Success"});
            }
        })
    }
};