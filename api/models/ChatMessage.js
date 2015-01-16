/**
* Chat.js
*
* @description :: Model for chat messages 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	owner:{
       model:'user'
    },

  	message: {
  		type:'STRING',
  		required: true
  	},
  	timestamp: {
  		type:'DATETIME'
  	},

  	formatDate: function (){
        var formattedDate = new Date(this.timestamp);
        var hour = formattedDate.getHours();
        var minute = formattedDate.getMinutes();
        var day = (formattedDate.getDate() < 10) ? 0 + "" + formattedDate.getDate() : formattedDate.getDate();
        var month = ((formattedDate.getMonth()+1) < 10) ? 0 + "" + (formattedDate.getMonth()+1) : (formattedDate.getMonth()+1);
        return formattedDate.getFullYear() + "." + month + "." + day + " " + hour + ":" + minute; 
    }
  },
  

  //Set timestamp as a current date
  beforeCreate: function(record, next){
  	record.timestamp = new Date();
  	next();
  },
};

