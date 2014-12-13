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
		Catch.find().exec(function(err, catches){
			return res.view('catch/index', {catches: catches});
		});
	},
	delete: function (req, res){
		var id = req.param('id');
		Catch.destroy({id:id}).exec(function deleteCB(err){
			if(err) return res.send(err);
  			res.redirect('catch/');
  		});
	},
	/**
	View action to authenticated user to see his/her own catches. This view also lets user to make updates to catch. 
	For other users, there is also a publicView action.
	*/
	view: function (req, res, next){
		Catch.findOne({'id' : req.param('id')}).exec(function (err, catch1){
			if(err || !catch1) return res.serverError();
			Lure.find({'userId': req.session.User.id}).exec(function (err, lures){
				if(err || !lures) return res.serverError();
				Fish.find().exec(function (err, fishes){
					if(err || !fishes) return res.serverError();
					return res.view('catch/view/', {catch1: catch1, lures: lures, fishes: fishes});
				});
			});
		});
	},

	/**
	viewPublic action to users to see other user's catches
	*/
	viewPublic: function(req, res, next){


	},
	
	update: function (req, res, next){
		Catch.update({id : req.param('id')}, 
			{
				weight : req.param('weight'), 
				date : req.param('date'),
				coordLongitude : req.param('coordLongitude'),
				coordLatitude : req.param('coordLatitude'),
				lureId : req.param('lureId'),
				fishId : req.param('fishId')
			}).exec(function(err, catch1){
				if(err) return next(err);
				req.session.flash = {
					message: "Success!" 
				}
				return res.redirect('catch/view/' + req.param('id'));
		});
	},

	/**
	*Create new catch and set current user to it's owner.
	*/
	processCreate: function(req, res, next){
		var params = req.allParams();
		//set current user to be owner
		params.owner = req.session.User.id;
		//Create 
		Catch.create(params, function(err, newCatch){
			if(err) {
				req.session.flash = {
					err: err 
				};
				res.redirect('/catch/create');}

			return res.redirect('catch/');
		});
	},

	create: function (req, res, next){
		Fish.find().exec(function (err, fishes){
			if(err) return res.serverError();
			Lure.find({'userId': req.session.User.id}).exec(function (err, lures){
				if(err) return res.serverError();
				return res.view('catch/create/', {lures: lures, fishes: fishes});
			});
		});
	},
};

