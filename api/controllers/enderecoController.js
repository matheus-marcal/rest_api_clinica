var mongoose = require('mongoose'),
Endereco = mongoose.model('Endereco');

exports.list_all_end = function(req, res) {
    Endereco.find({}, function(err, endereco) {
      if (err)
      res.send(err);
      res.json(endereco);
   });
};


exports.create_a_end = async function(req, res) {
    var new_end = new Endereco(req.body);
    new_end.save(function(err, endereco) {
    if (err)
       res.send(err);
    res.json(endereco);
    });
 };

exports.get_end_by_id = function(req, res) {
    Endereco.findById(req.params.endId, function(err, endereco) {
    if (err)
       res.send({"status":"Endereço não existe",err});
    res.json(endereco);
    });
 }; 


 exports.update_a_end = function(req, res) {
    Endereco.findOneAndUpdate({_id: req.params.endId}, req.body, {new: true}, function(err, endereco) {
    if (err)
       res.send({"status":"Endereço não existe",err});
    res.json(endereco);
    });
 };


 exports.delete_a_end= function(req, res) {
    Endereco.remove({
       _id: req.params.endId
    }, function(err, endereco) {
    if (err)
       res.send({"status":"Endereço não existe",err});
    res.json({ message: 'User successfully deleted' });
    });
 }
 