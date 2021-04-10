var mongoose = require('mongoose'),
Agenda = mongoose.model('Agenda');
User = mongoose.model('User')

exports.list_all_agendas = function(req, res) {
    Agenda.find({}, function(err, agend) {
      if (err)
      res.send(err);
      res.json(agend);
   });
};


exports.create_a_agenda = async function(req, res) {
    let flag = true
    if(req.body.medico){
        await User.findById(req.body.medico, function(err, user) {
            if (err || user.role!="medico"){
                res.send({"status":"medico invalido"})
                flag=false
            }
            });
       }
    if(req.body.paciente){
        await User.findById(req.body.paciente, function(err, user) {
            if (err || user.role!="paciente"){
                res.send({"status":"paciente invalido"})
                flag=false
            }
            });
       }
    if(flag){   
    var new_agenda = new Agenda(req.body);
    new_agenda.save(function(err, agend) {
    if (err)
       res.send(err);
    res.json(agend);
    });}
 };

exports.get_end_by_agenda = function(req, res) {
    Agenda.findById(req.params.agendaId, function(err, agend) {
    if (err)
       res.send({"status":"Agenda não existe",err});
    res.json(agend);
    });
 }; 


 exports.update_a_agenda = function(req, res) {
    Agenda.findOneAndUpdate({_id: req.params.agendaId}, req.body, {new: true}, function(err, agend) {
    if (err)
       res.send({"status":"Agenda não existe",err});
    res.json(agend);
    });
 };


 exports.delete_a_agenda= function(req, res) {
    Agenda.remove({
       _id: req.params.agendaId
    }, function(err, agend) {
    if (err)
       res.send({"status":"agenda não existe",err});
    res.json({ message: 'Agenda successfully deleted' });
    });
 }
 exports.find_with_medico_day= function (req,res){
    let horariolivre=['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30']  
    Message.find({"medico":req.body.medico,"data":req.body.data},function(err, agend) {
        if (err)
        res.send({"status":"Menssagem não existe",err});
        if(agend){
        agend.forEach(element => {
            horariolivre = horariolivre.filter(e => e !== element.horario)
        });
        res.json(horariolivre);
        }
        else 
        res.send({"status":"Menssagem não existe"});
    });
}
 