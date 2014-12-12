/**
* Catch.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	owner: {
  	 	model: 'user'
  	},
    lureId: {
        type:'STRING'
    },
    lures:{
        collection: 'lure',
        via: 'owners'
    },
    fishes:{
        collection: 'fish',
        via: 'owners'
    },
    fishId: {
        type:'STRING'
    },
    lakes:{
        collection: 'lake',
        via: 'owners'
    },

    weight: {
    	type: 'FLOAT'
    },
    date: {
    	type: 'DATE'
    },
    imageUrl: {
    	type: 'STRING'
    },
    coordLatitude: {
    	type: 'FLOAT',
        defaultsTo: 61.496632653965555
    },
    coordLongitude: {
    	type: 'FLOAT',
        defaultsTo: 23.763671875
    },
    // Attribute methods
    isOwnedByLoggedInUser: function (userId){
      return this.owner==userId;
    }
  }
};

