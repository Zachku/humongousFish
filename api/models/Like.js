/**
* Like.js
*
* @description :: Model to handle likes
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		owner:{
            model:'catch'
        },
		userId:'STRING'
	}
};