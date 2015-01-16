/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chat messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 module.exports = {
 	index: function (req, res){
		ChatMessage.find({sort: 'timestamp ASC'}).populate('owner').exec(function(err, messages){
			if(err) return res.send(err);
			return res.view('chat/index', {messages: messages});
		});
	},

	sendMessage: function (req, res){
		var params = req.params.all();
		params.owner = req.session.User.id;
		ChatMessage.create(params, function(err, message){
			ChatMessage.find({sort: 'timestamp ASC'}).populate('owner').exec(function(err, messages){
				if(err) return res.serverError();
				return res.view('chat/chatMessages', {layout:null, messages: messages});
			});
		});
	},

	refreshMessages: function (req, res){
		ChatMessage.find({sort: 'timestamp ASC'}).populate('owner').exec(function(err, messages){
			if(err) return res.serverError();
			return res.view('chat/chatMessages', {layout:null, messages: messages});
		});
	}
 };