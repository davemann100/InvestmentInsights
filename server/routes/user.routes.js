const UserController = require('../controllers/user.controller');

module.exports = app => {
  app.get('/api/users', UserController.getAllUsers);
  app.post('/api/register', UserController.registerUser);
  app.post('/api/login', UserController.loginUser);
  app.post('/api/logout', UserController.logoutUser);
  app.get('/api/checkAuthorization', UserController.checkAuthorization);
  // app.patch('/api/users/:id', UserController.update);
  // app.delete('/api/users/:id', UserController.delete);
}