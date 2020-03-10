var users = require('../controllers/users-controller');

module.exports = function (app) {
  app.get('/user/:id',
        users.getUserById
  );     
};

/**
 * get currently logged in user data
 */
module.exports = function (app) {
  app.get('/user/current',
        users.getCurrentUser
  );     
};

/**
 * toggle current's user host/guest status
 */
module.exports = function (app) {
  app.get('/changeStatus',
        users.changeUserStatus
  );     
};

