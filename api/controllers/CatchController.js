/**
 * CatchController
 *
 * @description :: Server-side logic for managing Catches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next){
		Catch.find().exec(function(err, catches){
			return res.view('', {catches: catches});
		});
	},

	delete: function (req, res){
		var id = req.param('id');
		Catch.destroy({id:id}).exec(function deleteCB(err){
			if(err) return res.send(err);
  			res.redirect('catch/');
  		});
	},

	view: function (req, res){
		Catch.findOne({
			'id' : req.param('id')
		}).exec(function(err, catch1){
			if(err || !catch1) return res.view('404');
			return res.view('catch/view/', {catch1: catch1});
		});
	},

	update: function (req, res, next){

		var params = req.allParams();
		Catch.update({id : req.param('id')}, 
			{
				weight : req.param('weight'), 
				date : req.param('date')
			}).exec(function(err, catch1){
			if(err) return next(err);
			return res.redirect('catch/');
		});
	},

	processCreate: function(req, res, next){
		var params = req.allParams();
		Catch.create(params, function(err, newCatch){
			if(err) return next(err);

			return res.redirect('catch/');
		});
	}
};

