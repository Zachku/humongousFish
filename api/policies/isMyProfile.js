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
  
	var requestedUserId = req.param('id'); 
	console.log("eka: " + req.param('id')+ "!");
	var userId = req.session.User.id;
	console.log("tok: " + req.session.User.id + "!");
	if(requestedUserId == userId) {
		return next();
	} return res.forbidden('You are not permitted to perform this action.');
};