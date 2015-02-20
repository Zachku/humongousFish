/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chat messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 module.exports = {
 	/*
 	* Delete all messages
	*/
	deleteMessages: function (req, res, next){
		ChatMessage.deleteAll(next);
		return res.redirect('chatMessage/chat');
	},

 	/*
	*
	*
	*	Functions to implement longpolling chat(n)
 	*
	*
 	*/

 	/**
 	* Index function
 	*/
 	index: function (req, res){
		ChatMessage.deleteOld();
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
		//ChatMessage.deleteOld();
		ChatMessage.find({sort: 'timestamp ASC'}).populate('owner').exec(function(err, messages){
			if(err) return res.serverError();
			return res.view('chat/chatMessages', {layout:null, messages: messages});
		});
	},


	/**
	*
	*
	*	Functions to use sails' socket to chat(y)
	*
	*
	*/

	/**
	* View function for socket chat
	*/
	chat: function (req, res) {
		ChatMessage.find({sort: 'timestamp ASC'}).populate('owner').exec(function(err, messages){
			if(err) return res.send(err);
			return res.view('chat/chat', {messages: messages});
		});
	}, 

	/**
	* Message addition to socket implementation
	*/
	addMessage: function (req, res, next){
		var params = req.params.all();
		params.owner = req.session.User.id;

		if(req.isSocket){

			ChatMessage.create({
				owner: params.owner, 
				message: params.message
			}).exec( function created(err, chatMessage){
				ChatMessage.publishCreate({
					id: chatMessage.id, 
					owner: req.session.User.username,
					chatMessage: chatMessage.message,
					timestamp: chatMessage.formatDate()
				});
			});
		}
	}, 

	/**
	* Subscribe user to new ChatMessages
	*/
	sub: function (req, res){
		ChatMessage.deleteOld();
		if(req.isSocket){
			ChatMessage.watch(req);
		}
	}
 };