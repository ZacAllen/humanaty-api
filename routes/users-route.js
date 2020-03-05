var users = require('../controllers/users-controller');

module.exports = function (app) {
  app.get('/user/:id',
        users.getUserById
  );     
};