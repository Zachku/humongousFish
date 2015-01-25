/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: THis policy checks is requested catch public.
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  	var requestedItemId = req.param('id'); 
	var userId = req.session.User.id;

	Catch.findOne({id: requestedItemId}).exec(function (err, c){
		if(!c.isPublic){
			if(c.owner != userId) {
				return res.forbidden('You are not permitted to perform this action.');
			}
		}
		return next();
	});
};