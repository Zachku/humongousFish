/**
 * LureController
 *
 * @description :: Server-side logic for managing lures
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	processCreate: function(req, res, next){
		var params = req.params.all();
		params.userId = req.session.User.id;
		console.log(params.userId);
		Lure.create(params, function(err, lure){
			if(err) return next(err);
			return res.redirect('lure/index');
		});

	},

	index: function (req, res){
		Lure.find({userId: req.session.User.id}).exec(function(err, lures){
			if(err) return res.send(err);
			return res.view('lure/index', {lures: lures});
		});
	},

	view: function (req, res){
		Lure.findOne({
			'id' : req.param('id')
		}).exec(function(err, lure){
			if(err || !lure) return res.view('404');
			return res.view('lure/view/', {lure: lure});
		});
	},

	update: function (req, res){
		var params = req.allParams();
		Lure.update({id : req.param('id')}, {
			brand : req.param('brand'), 
			url : req.param('url'), 
			model : req.param('model')}
			).exec(function(err, lure){
			if(err) return res.serverError();
			return res.redirect('lure/');
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

