/**
 * LakeController
 *
 * @description :: Server-side logic for managing lakes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	processCreate: function(req, res, next){
		var params = req.params.all();
		params.userId = req.session.User.id;
		Lake.create(params, function(err, lake){
			if(err) return next(err);
			return res.redirect('lake/index');
		});

	},

	index: function (req, res){
		Lake.find({userId: req.session.User.id}).exec(function(err, lakes){
			if(err) return res.send(err);
			return res.view('lake/index', {lakes: lakes});
		});
	},

	view: function (req, res){
		Lake.findOne({
			'id' : req.param('id')
		}).exec(function(err, lake){
			if(err || !lake) return res.view('404');
			return res.view('lake/view/', {lake: lake});
		});
	},

	update: function (req, res){
		var params = req.allParams();
		Lake.update({id : req.param('id')}, {
			name : req.param('name'), 
			town : req.param('town')}
			).exec(function(err, lure){
			if(err) return res.serverError();
			return res.redirect('lake/');
		});
	},

	delete: function (req, res){
		if(req.method !== 'POST') return res.forbidden();
		var id = req.param('id');
		Lake.destroy({id:id}).exec(function deleteCB(err){
			if(err) return res.send(err);
  			res.redirect('lake/');
  		});
	},
};

