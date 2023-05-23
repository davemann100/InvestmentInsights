// user.routes.js

const UserController = require('../controllers/user.controller');

module.exports = app => {
  app.get('/api/users',UserController.getAllUsers);
  app.post('/api/register',UserController.registerUser);
  app.post('/api/login', UserController.loginUser);

  // app.patch('/api/authors/:id',UserController.update);
  // app.delete('/api/authors/:id',UserController.delete);

}