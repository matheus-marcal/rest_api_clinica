'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var agendaSchema = new Schema({
    data:{
        type: Date,
        required:true
    },
    horario:{
        type: String,
        required:true
    },
    paciente:{
        type: String,
        required:true
    },
    medico:{
        type: String,
        required:true
    }
})


module.exports = mongoose.model('Agenda', agendaSchema);