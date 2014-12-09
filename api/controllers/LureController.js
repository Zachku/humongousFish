/**
 * LureController
 *
 * @description :: Server-side logic for managing lures
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	processCreate: function(req, res, next){
		if(!req.session.authenticated) return res.redirect('auth/login');

		var params = req.params.all();
		params.userId = req.session.User.id;
		console.log(params.userId);
		Lure.create(params, function(err, lure){
			if(err) return next(err);
			return res.redirect('lure/index');
		});

	},

	index: function (req, res){
		if(!req.session.authenticated) return res.redirect('auth/login');

		Lure.find({userId: req.session.User.id}).exec(function(err, lures){
			if(err) return res.send(err);
			return res.view('lure/index', {lures: lures});
		});
	},

	view: function (req, res){
		if(!req.session.authenticated) return res.redirect('auth/login');

		Lure.findOne({
			'id' : req.param('id')
		}).exec(function(err, user){
			if(err || !lure) return res.view('404');
			return res.view('lure/view/', {lure: lure});
		});
	},

	update: function (req, res){
		if(!req.session.authenticated) return res.redirect('auth/login');

		var params = req.allParams();
		Lure.update({id : req.param('id')}, {
			brand : req.param('brand'), 
			model : req.param('model')}
			).exec(function(err, lure){
			if(err) return res.view('404');
			return res.redirect('user/');
		});
	},

	delete: function (req, res){
		var id = req.param('id');
		Lure.destroy({id:id}).exec(function deleteCB(err){
			if(err) return res.send(err);
  			res.redirect('lure/');
  		});
	},
};

