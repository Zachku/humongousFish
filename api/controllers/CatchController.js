/**
 * CatchController
 *
 * @description :: Server-side logic for managing Catches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next){
		if(!req.session.authenticated) return res.redirect('user/login');
		Catch.find({owner : req.session.User.id}).exec(function(err, catches){
			return res.view('', {catches: catches});
		});
	},
	listAll: function(req, res, next){
		if(!req.session.authenticated) return res.redirect('user/login');
		Catch.find().exec(function(err, catches){
			return res.view('catch/index', {catches: catches});
		});
	},
	delete: function (req, res){
		if(
		req.param('id') ||
		Catch.findOne({id: req.param('id')}).exec(function (err, c){
	        if(!(c.owner == req.session.User.id)) return false;
	    })) return res.forbidden();

		var id = req.param('id');
		Catch.destroy({id:id}).exec(function deleteCB(err){
			if(err) return res.send(err);
  			res.redirect('catch/');
  		});
	},

	view: function (req, res, next){
		if(!req.session.authenticated) return res.redirect('auth/login');
		Catch.findOne({id: req.param('id')}).exec(function (err, c){
	        if(!(c.owner == req.session.User.id)) res.forbidden();
	    });

		Catch.findOne({
			'id' : req.param('id')
		}).exec(function (err, catch1){
			if(err || !catch1) return res.view('404');
			return res.view('catch/view/', {catch1: catch1});
		});
	},

	update: function (req, res, next){

		var params = req.allParams();
		Catch.update({id : req.param('id')}, 
			{
				weight : req.param('weight'), 
				date : req.param('date'),
				coordLongitude : req.param('coordLongitude'),
				coordLatitude : req.param('coordLatitude')
			}).exec(function(err, catch1){
				if(err) return next(err);
				req.session.flash = {
					message: "Success!" 
				}
				return res.redirect('catch/view/' + req.param('id'));
		});
	},

	processCreate: function(req, res, next){
		if(!req.session.authenticated) return res.redirect('auth/login'); 

		var params = req.allParams();
		params.owner = req.session.User.id;
		Catch.create(params, function(err, newCatch){
			if(err) return next(err);

			return res.redirect('catch/');
		});
	}
};

