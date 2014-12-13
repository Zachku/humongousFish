/**
 * HomeController
 *
 * @description :: Server-side logic for managing homepage
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
	homepage: function(req, res, next){
		Catch.find().exec(function(err, catches){
			if(err) return res.serverError();
			return res.view('homepage', {catches: catches});
		});
	}
}