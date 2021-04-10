'use strict';
var mongoose = require('mongoose'),
Message = mongoose.model('Messages');
exports.list_all_messages = function(req, res) {
   Message.find({}, function(err, msg) {
      if (err)
      res.send(err);
      res.json(msg);
   });
};
exports.create_a_message = async function(req, res) {
    let parent = true
   var i=0
   if(req.body.parent){
    for(i=0;i<req.body.parent.length;i++){
    await Message.findById(req.body.parent[i], function(err, msg) {
        console.log("1")
        if (err){
            res.send({"status":"parente invalido"})
            i=req.body.parent.length
            parent=false
        }
        });
   }}
   if(parent){
   var new_msg = new Message(req.body);
   new_msg.save(function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });}
};
exports.read_a_message = function(req, res) {
   Message.findById(req.params.msgId, function(err, msg) {
   if (err)
      res.send({"status":"Menssagem não existe",err});
   res.json(msg);
   });
};
exports.update_a_message = function(req, res) {
   Message.findOneAndUpdate({_id: req.params.msgId}, req.body, {new: true}, function(err, msg) {
   if (err)
      res.send({"status":"Menssagem não existe",err});
   res.json(msg);
   });
};
exports.delete_a_message = function(req, res) {
   Message.remove({
      _id: req.params.msgId
   }, function(err, msg) {
   if (err)
      res.send({"status":"Menssagem não existe",err});
   res.json({ message: 'Message successfully deleted' });
   });
}
exports.login = function (req,res){
    Message.findOne({"title":req.body.title},function(err, msg) {
        if (err)
           res.send(err);
        else if(msg)msg.comparePassword(req.body.password,function(err, isMatch) {
           if (err) res.send(err)
           if(isMatch)
           res.send({"login":isMatch,"role":msg.role,"id":msg.id})
           else
           res.send({"login":isMatch})
        });
        else 
        res.send({"erro":"usuario não existe","erroid":1});
        });
};
exports.find_with_title= function (req,res){
    Message.findOne({"title":req.params.title},function(err, msg) {
        if (err)
        res.send({"status":"Menssagem não existe",err});
        if(msg)
        res.json(msg);
        else 
        res.send({"status":"Menssagem não existe"});
    });
}