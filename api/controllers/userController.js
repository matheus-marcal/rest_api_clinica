'use strict';
var mongoose = require('mongoose'),
User = mongoose.model('User');
Endereco = mongoose.model('Endereco');
exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
      if (err)
      res.send(err);
      res.json(user);
   });
};

exports.create_a_user = async function(req, res) {
   let endereco = true
   var i=0
   if(req.body.parent){
    for(i=0;i<req.body.endereco.length;i++){
    await Endereco.findById(req.body.endereco[i], function(err, user) {
        if (err){
            res.send({"status":"endereco invalido"})
            i=req.body.endereco.length
            endereco=false
        }
        });
   }}
   if(endereco){
   var new_user = new User(req.body);
   new_user.save(function(err, user) {
   if (err)
      res.send(err);
   res.json(user);
   });}
};

exports.get_user_by_id = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
    if (err)
       res.send({"status":"User não existe",err});
    res.json(user);
    });
 };

 exports.update_a_user = function(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
       res.send({"status":"User não existe",err});
    res.json(user);
    });
 };

 exports.delete_a_user = function(req, res) {
    User.remove({
       _id: req.params.userId
    }, function(err, user) {
    if (err)
       res.send({"status":"User não existe",err});
    res.json({ message: 'User successfully deleted' });
    });
 }
exports.login = function (req,res){
    User.findOne({"email":req.body.email},function(err, user) {
        if (err)
           res.send(err);
        else if(user)user.comparePassword(req.body.password,function(err, isMatch) {
           if (err) res.send(err)
           if(isMatch)
           res.send({"login":isMatch,"role":user.role,"id":user.id})
           else
           res.send({"login":isMatch})
        });
        else 
        res.send({"erro":"usuario não existe","erroid":1});
        });
};