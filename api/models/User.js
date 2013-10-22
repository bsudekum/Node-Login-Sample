/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
var bcrypt = require('bcrypt');
var gravatar = require('nodejs-gravatar');

module.exports = {

  schema: true,

	attributes: {
	  
  	username: {
  		type: 'string',
  		required: true
  	},

  	email: {
  		type: 'string',
  		required: true,
  		email: true,
  		// unique: true
  	},

    admin: {
      type: 'boolean',
      required: true,
      defaultsTo: true
    },

    gravatar: {
      type: 'string',
      required: true,
      defaultsTo: 'http://static.bleacherreport.net/images/redesign/avatars/default-user-icon-profile.png'
    },

  	password: {
  		type: 'string',
  		required: true
  	},

    encryptedPassword: {
      type: 'string',
      required: true
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.encryptedPassword;
      return obj;
    }
	    
	},

  beforeValidation: function(values, next) {
    console.log(values);
    if (typeof values.admin !== 'undefined') {
      values.admin = false;
    } else if (values.admin[1] === 'on') {
      values.admin = true;
    }
    next();
  },

  beforeCreate: function (values, next) {

    if (!values.password || values.password != values.encryptedPassword) {
      return next({err: ['Passwords do not match.']})
    }

    bcrypt.hash(values.password, 10, function passwordEncrypted (err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      
      // values.online = true;
      values.gravatar = gravatar.imageUrl(values.email, { 'size': '100' });
      
      next();
    });

  }

};
