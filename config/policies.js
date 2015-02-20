/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {
  CatchController: {
    '*': false, 
    viewPublic: ['sessionAuth','isPublic'],
    index: 'sessionAuth',
    uploadImage: true,
    create: 'sessionAuth',
    processCreate: 'sessionAuth',
    likeCatch: 'sessionAuth',
    view: ['sessionAuth', 'isMyCatch'],
    addLure: ['sessionAuth', 'isMyCatch'],
    updateFish: ['sessionAuth', 'isMyCatch'],
    update: ['sessionAuth', 'isMyCatch'],
    delete: ['sessionAuth', 'isMyCatch']
  },
  LureController: {
    '*': false, 
    index: 'sessionAuth',
    create: 'sessionAuth',
    processCreate: 'sessionAuth',
    view: ['sessionAuth', 'isMyLure'],
    update: ['sessionAuth', 'isMyLure'],
    delete: ['sessionAuth', 'isMyLure']
  },
  LakeController: {
    '*': false, 
    index: 'sessionAuth',
    create: 'sessionAuth',
    processCreate: 'sessionAuth',
    view: ['sessionAuth', 'isMyLake'],
    update: ['sessionAuth', 'isMyLake'],
    delete: ['sessionAuth', 'isMyLake']
  },
  UserController: {
    '*': false, 
    index: 'sessionAuth',
    create: true,
    login: true,
    logout: true,
    processLogin: true,
    view: ['sessionAuth', 'isMyProfile'],
    update: ['sessionAuth', 'isMyProfile'],
    delete: ['sessionAuth', 'isMyProfile']
  },
  ChatMessageController: {
    '*': false,
    index: true,
    sendMessage: 'sessionAuth',
    refreshMessages: true,
    chat: true,
    addMessage: 'sessionAuth',
    sub: true,
    deleteMessages: 'sessionAuth'
  }
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
