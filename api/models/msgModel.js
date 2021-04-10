'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;
var msgSchema = new Schema({
   title: {
      type: String,
   },
   body: {
      type: String
   },
   telefone:{
    type: String,
    validate: {
    validator: function(v) {
        return /^(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/.test(v);   
        },
        message: props => `${props.value} is not a valid phone number!`
    }},
   Created_date: {
      type: Date,
      default: Date.now
   },
   password: { type: String},
   role: { type: String,
    enum:['paciente','funcionario','medico','admin']
    },
   CRM:{
       type:String,
       required: [function() { return this.role == "medico"},"CRM é obrigatorio para medico"]
   },
   endereco:[String],
   parent:{
       type:[String]
      
   }
});

msgSchema.pre('save', function(next) {
    var msg = this;

    // only hash the password if it has been modified (or is new)
    if (!msg.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(msg.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            msg.password = hash;
            next();
        });
    });
});
     
msgSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('Messages', msgSchema);