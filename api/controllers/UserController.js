/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {
	index: function (req, res){
		User.find().exec(function(err, users){
			if(err) return res.send(err);
			return res.view('user/index', {users: users});
		});
	},

	view: function (req, res){
		User.findOne({
			'id' : req.param('id')
		}).exec(function(err, user){
			if(err || !user) return res.view('404');
			return res.view('user/view/', {user: user});
		});
	},

	update: function (req, res){
		var params = req.allParams();
		User.update({id : req.param('id')}, 
			{email : req.param('email'), 
			motto : req.param('motto'),
			password : req.param('password'),
			avatarImageUrl : req.param('avatarImageUrl')}
			).exec(function(err, user){
				console.log(req.param('id') + " " + req.param('email'));
				if(err) return res.view('404');
				return res.redirect('user/view/'+req.param('id'));
		});
	},

	create: function (req, res){
		var params = req.params.all();
		User.create(params, function(err, user){
			if(err) return res.send(err);
			return res.redirect('user/login');
		});
	},

	delete: function (req, res){
		// get method not allowed
		if(req.method === 'GET') return res.forbidden();


		var id = req.param('id');
		User.destroy({id:id}).exec(function deleteCB(err){
			if(err) return res.send(err);
  			res.redirect('user/');
  		});
	},

	deleteform: function (req, res){
		return res.view();
	},

	processLogin: function (req, res, next) {
		if( !req.param('username') || !req.param('password')){
			var requiredMessage = [{name : 'requiredMessage', message: 'Enter username and password.'}];
			
			req.session.flash = {
				err : requiredMessage
			}

			return res.redirect('user/login');
		}

		User.findOneByUsername(req.param('username')).exec(function(err, user){
			if(err) return next(err);

			if(!user) {
				var noAccountError = [{name: 'noAccount', message: 'Username ' + req.param('username') + ' not found.'}]
				req.session.flash = {
					err: noAccountError
				}
				return res.redirect('user/login');
			}

			bcrypt.compare(req.param('password'), user.password, function(err, valid){
				if(err) return next(err);

				if(!valid){
					var usernamePasswordMismatch = [{name: 'usernamePasswordMismatch', message: 'Password incorrect.'}]
					req.session.flash = {
						err: usernamePasswordMismatch
					}
					return res.redirect('user/login');
				}

				req.session.authenticated = true;
				req.session.User = user;

				return res.redirect('user/view/' + user.id);
			})
		})
	},

	login: function (req, res){
		return res.view();
	},

	logout: function (req, res, next){
		req.session.destroy();

		return res.redirect('user/login');
	}
	
};

