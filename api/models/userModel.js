'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;
var userSchema = new Schema({
   nome: {
      type: String,
      required:true
   },
   email: {
      type: String,
      required:true,
      unique: true
   },
   telefone:{
    type: String,
    unique: true,
    required:true,
    validate: {
        validator: function(v) {
            return /^(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/.test(v);   
            },
            message: props => `${props.value} is not a valid phone number!`
        }},
    password: { type: String,required:true},
    role: { 
        type: String,
        required:true,
        enum:['paciente','funcionario','medico','admin']
    },
    endereco:{type:[String],required:true},
    peso:{
        type:Number,
        required: [function() { return this.role == "paciente"},"Peso é obrigatorio para paciente"]
    },
    altura:{
        type:Number,
        required: [function() { return this.role == "paciente"},"Altura é obrigatorio para paciente"]
    },
    tiposanguineo:{
        type:Number,
        enum:['O-','O+','A-','A+','B-','B+','AB-','AB+'],
        required: [function() { return this.role == "paciente"},"Tipo Sanguineo é obrigatorio para paciente"]
    },
    contrato_date: {
        type: Date,
        default: function() {if(this.role == "medico" || this.role == "funcionario")return Date.now}
    },
    salario:{
        type:Number,
        required: [function() { return this.role == "medico" || this.role == "funcionario"},"Salario é obrigatorio para medico e funcionario"]
    },
    CRM:{
        type:String,
        required: [function() { return this.role == "medico"},"CRM é obrigatorio para medico"]
    },
    especialidade:{
        type:String,
        required: [function() { return this.role == "medico"},"CRM é obrigatorio para medico"]
    },
   Created_date: {
      type: Date,
      default: Date.now
   }
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);