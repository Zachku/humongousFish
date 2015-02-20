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
        var minute = (formattedDate.getMinutes() < 10) ? 0 + "" + formattedDate.getMinutes() : formattedDate.getMinutes();
        var day = (formattedDate.getDate() < 10) ? 0 + "" + formattedDate.getDate() : formattedDate.getDate();
        var month = ((formattedDate.getMonth()+1) < 10) ? 0 + "" + (formattedDate.getMonth()+1) : (formattedDate.getMonth()+1);
        return day + "." + month + "." + formattedDate.getFullYear() + " " + hour + ":" + minute; 
    }
  },
  

  //Set timestamp as a current date
  beforeCreate: function(record, next){
  	record.timestamp = new Date();
  	next();
  },

  deleteOld: function (next) {
    var comparableDate = new Date();
    comparableDate.setMinutes(comparableDate.getMinutes() - 10);
    ChatMessage.find().exec(function(err, msgs){
      if(msgs.length > 0){
        for(var i = 0; i < msgs.length; i++){
            var timestamp = new Date(msgs[i].timestamp);
            if(timestamp < comparableDate){
              ChatMessage.destroy({id:msgs[i].id}).exec(function deleteCB(err){}); 
            }
        } 
      }
    });
  },

  deleteAll: function () {
    ChatMessage.destroy().exec(function deleteCB(err){});       
  }
};

