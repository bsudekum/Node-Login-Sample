/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  // schema: true,

	attributes: {
	  
  	latlng: {
  		type: 'string',
      defaultsTo: '0,0',
  		required: true
  	},

    username: {
      type: 'string',
      defaultsTo: 'admin',
      required: true
    },

  	device: {
      type: 'string',
      defaultsTo: 'Android',
      required: true
    },

    publicView: {
      type: 'boolean',
      defaultsTo: false
    }

	}
	
};
