'use strict';
module.exports = function(app) {
var messages = require('./api/controllers/msgController');
var user = require('./api/controllers/userController');
var endereco = require('./api/controllers/enderecoController');
var agenda = require('./api/controllers/agendaController');
var cors = require('cors')
// messages Routes
app.use(cors())
app.route('/messages')
   .get(messages.list_all_messages)
   .post(messages.create_a_message);
app.route('/messages/:msgId')
   .get(messages.read_a_message)
   .put(messages.update_a_message)
   .delete(messages.delete_a_message);
app.route('/messages/role/:role')
    .get(messages.find_with_role)
app.route('/messages/title/:title')
    .get(messages.find_with_title)
app.route('/user')
    .get(user.list_all_users)
    .post(user.create_a_user);
app.route('/user/:userId')
    .get(user.get_user_by_id)
    .put(user.update_a_user)
    .delete(user.delete_a_user);
app.route('/user/role/:role')
    .get(user.find_with_role)
app.route('/login')
     .post(messages.login)
    // .post(user.login)
app.route('/endereco')
    .get(endereco.list_all_end)
    .post(endereco.create_a_end);
app.route('/endereco/:endId')
    .get(endereco.get_end_by_id)
    .put(endereco.update_a_end)
    .delete(endereco.delete_a_end);
app.route('/agenda')
    .get(agenda.list_all_agendas)
    .post(agenda.create_a_agenda);
app.route('/agenda/:agendaId')
    .get(agenda.get_end_by_agenda)
    .put(agenda.update_a_agenda)
    .delete(agenda.delete_a_agenda);
app.route('/agenda/disponivel') 
    .post(agenda.find_with_medico_day)
};