/**
 * CatchController
 *
 * @description :: Server-side logic for managing Catches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/*
	* Index function. Indexing all cathches of current logged in user.
	*/
	index: function(req, res, next){
		if(!req.session.authenticated) return res.redirect('user/login');
		Catch.find({sort: 'date DESC',owner : req.session.User.id}).populate('fish').populate('lure').exec(function(err, catches){
			return res.view('', {
				catches: catches
			}); 
		});
	},

	/*
	* Public index function. Indexing all public catches of given user
	*/
	indexPublic: function(req, res, next){
		User.findOne({'id': req.param('id')}).exec(function(err, user){
			if(err) return err;
			console.log(req.param('id'));
			Catch.find({
				sort: 'date DESC',
				where: { 
					isPublic: true, 
					'owner' : req.param('id')}
				})
			.populate('fish').populate('lure').exec(function(err, catches){
				return res.view('', {
					catches: catches,
					user: user
				}); 
			});
		});
	},

	/*
	* Delete function for specific catch
	*/
	delete: function (req, res){
		// get method not allowed:
		if(req.method === 'GET') return res.forbidden();

		//get id from params and destroy catch
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
		Catch.findOne({'id' : req.param('id')}).populate('fish').populate('lure').populate('lake').exec(function (err, catch1){
			if(err || !catch1) return res.serverError();
			Lure.find({'userId': req.session.User.id}).exec(function (err, lures){
				if(err || !lures) return res.serverError();
				Fish.find().exec(function (err, fishes){
					Like.find({'owner': req.param('id')}).exec(function (err, likes){
						Lake.find({'userId': req.session.User.id}).exec(function (err, lakes){
							if(err || !fishes) return res.serverError();
							return res.view('catch/view/', {
								catch1: catch1, 
								lures: lures, 
								likes: likes.length,
								lakes: lakes, 
								fishes: fishes,
								date: catch1.formatDate()
							});
						});
					});
				});
			});
		});
	},

	/**
	* viewPublic action to users to see other user's catches
	*/
	viewPublic: function(req, res, next){
		Catch.findOne({'id' : req.param('id')}).populate('owner').populate('fish').populate('lure').populate('lake').exec(function (err, catch1){
			Like.find({'owner': req.param('id')}).exec(function (err, likes){
				var userAllreadyLikedThisCatch = false;
				for(var i = 0; i < likes.length; i++){
					if(likes[i].userId === req.session.User.id){
						userAllreadyLikedThisCatch = true;
					}
				}
				if(err || !catch1) return res.serverError();
				return res.view('catch/viewPublic/', {
					likes: likes.length,
					catch1: catch1,
					userAllreadyLikedThisCatch: userAllreadyLikedThisCatch
				});
			});
		});

	},

	/**
	 Method to like or unlike specific catch.
	 If user has already liked this catch, method will remove that like 
	 returns partial view 'likes'
	*/
	likeCatch: function (req, res) {
  		if(req.method !== 'POST') return res.forbidden();
  		
		var params = req.params.all();
		params.userId = req.session.User.id;
		params.owner = req.param('catchId');

		
		Like.find({'owner': req.param('catchId')}).exec(function (err, likes){
			var userAllreadyLikedThisCatch = false;
			for(var i = 0; i < likes.length; i++){
				if(likes[i].userId === req.session.User.id){
					userAllreadyLikedThisCatch = true;
				}
			}
			//Create new Like if user hasn't liked this yet. 
			if(!userAllreadyLikedThisCatch){
				Like.create(params, function(err, newLike){});
			} else{
				Like.destroy({'userId': req.session.User.id, 'owner': req.param('catchId')}).exec(function deleteCB(err){});
			}
			return res.redirect('catch/viewPublic/' + req.param('catchId'));
		});
  	},


	/**
	* Update-function for weight, date and coords
	*/
	update: function (req, res, next){
		if(req.method !== 'POST') return res.forbidden();
		Catch.update({id : req.param('id')}, 
			{
				weight : req.param('weight'), 
				date : req.param('date'),
				coordLongitude : req.param('coordLongitude'),
				coordLatitude : req.param('coordLatitude'),
				lure : req.param('lureId'),
				isPublic : req.param('isPublic'),
				lake : req.param('lakeId'),
				fish : req.param('fishId')
			}).exec(function(err, catch1){
				if(err) {
					req.session.flash = {
						err: 'Something went wrong.'
					}
				}
				else req.session.flash = {
					message: "Success!" 
				}
				return res.redirect('catch/view/' + req.param('id'));
		});
	},

	/**
	* Update function for fishes
	*/
	updateFish:function (req, res, next){
		Catch.update(
			{
				id : req.param('id')
			}, 
			{
				fish : req.param('fishId')
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
		params.lure = req.param('lureId');
		params.fish = req.param('fishId');

		//Create 
		Catch.create(params, function(err, newCatch){
			if(err) {
				req.session.flash = {
					err: 'Something is missing.'
				};
				return res.redirect('/catch/create');
			}

			return res.redirect('catch/view/'+newCatch.id);
		});
	},

	/**
	* Create new catch
	*/
	create: function (req, res, next){
		Fish.find().exec(function (err, fishes){
			if(err) return res.serverError();
			Lure.find({'userId': req.session.User.id}).exec(function (err, lures){
				if(err) return res.serverError();
				return res.view('catch/create/', {lures: lures, fishes: fishes});
			});
		});
	},

	uploadImage: function  (req, res) {
		var catchId = req.param('id');
		var uploadPath = '../public/images/avatarImages';

		req.file('avatar').upload({dirname: uploadPath, saveAs: catchId + ".png"},function (err, files) {
			if (err)
				return res.serverError(err);

			Catch.update({id : catchId}, {imageUrl : catchId + ".png"})
			.exec(function(err, catch1){
				if(err) return next(err);
				req.session.flash = {
					message: "Success!" 
				}
				return res.redirect('catch/view/' + req.param('id'));
			});
		});
  	}
};

