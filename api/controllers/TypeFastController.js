/**
 * UserController
 *
 * @description :: TypeFast-application controller
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {
	index: function(req, res, next){
		return res.view('typeFast/typeFast');
	}
}