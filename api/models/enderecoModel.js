'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var enderecoSchema = new Schema({
    cep: {
        type: String,
        required:true
     },
     logradouro: {
        type: String,
        required:true
     },
     bairro: {
        type: String,
        required:true
     },
     cidade: {
        type: String,
        required:true
     },
     Estado: {
        type: String,
        required:true
     }
})


module.exports = mongoose.model('Endereco', enderecoSchema);