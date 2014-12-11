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
	var userId = req.session.User.id;
	console.log("LureId: " +requestedItemId + " userId: " + userId);
	Lure.findOne({id: requestedItemId}).exec(function (err, lure){
		if(lure.userId == userId) {
			return next();
		} return res.forbidden('You are not permitted to perform this action.');
	});
};
