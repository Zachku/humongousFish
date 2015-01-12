/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  
	var requestedItemId = req.param('id'); 
	console.log(req.param('id'));
	var userId = req.session.User.id;
	Lake.findOne({id: requestedItemId}).exec(function (err, lake){
		if(lake.userId == userId) {
			return next();
		} return res.redirect('user/login');;
	});
};
