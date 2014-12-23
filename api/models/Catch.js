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

    lure:{
        model: 'lure'
    },

    fish:{
        model: 'fish'
    },

    lake:{
        model: 'lake'
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
    },

    formatDate: function (){
        var formattedDate = new Date(this.date);
        var day = (formattedDate.getDate() < 10) ? 0 + "" + formattedDate.getDate() : formattedDate.getDate();
        return formattedDate.getFullYear() + "-" + (formattedDate.getMonth()+1) + "-" + day; 
    }
  }
};

