var pets = require('../controllers/pets');
var path = require('path');

module.exports = function(app){
    // GET: Retrieve all pets
    app.get('/allpets', function(req,res) {
        pets.all_pets(req,res);
    })

    // GET: Retrieve a pet by ID
    app.get('/allpets/:id', function(req,res) {
        pets.find_pet(req,res);
    })

    // POST: Create a pet
    app.post('/allpets', function(req,res){
        pets.add_pet(req,res);
    })

    // PUT: Update a pet by ID
    app.put('/allpets/:id', function(req,res){
        pets.upd_pet(req,res);
    })

    // DELETE: Delete a pet by ID
    app.delete('/allpets/:id', function(req,res) {
        pets.del_pet(req,res);
    })

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}