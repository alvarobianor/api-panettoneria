const { Router } = require('express');

// const authMiddleware = require('./app/middlewares/auth');

// const UserController = require('./app/controllers/UserController');
// const ActionController = require('./app/controllers/ActionController');
// const CategoryController = require('./app/controllers/CategoryController');
// const FilterController = require('./app/controllers/FilterController');
// const SessionController = require('./app/controllers/SessionController');
const Controller = require('./app/controllers/Panettone');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

const routes = new Router();

routes.post('/cadastro', upload.single('urlImg'), Controller.store);
routes.get('/search', Controller.show);
routes.get('/brands', Controller.brands);

// routes.post('/sessions', SessionController.store);

// routes.get('/', (req, res) => {
//   return res.send('Root');
// });
// routes.post('/users', UserController.store);
// routes.post('/action/filter', FilterController.show);

// // -----------------------------------------------------------
// // routes.use(authMiddleware);

// routes.post('/actions', ActionController.store);
// routes.get('/action', ActionController.show);
// routes.get('/actions', ActionController.index);
// routes.put('/actions', ActionController.update);
// routes.delete('/actions', ActionController.destroy);

// routes.post('/category', CategoryController.store);
// routes.get('/category', CategoryController.show);
// routes.get('/categories', CategoryController.index);
// routes.put('/category', CategoryController.update);
// routes.delete('/category', CategoryController.destroy);

// routes.get('/users', UserController.index);
// routes.get('/users/:id', UserController.show);
// routes.put('/users/:id', UserController.update);
// routes.delete('/users/:id', UserController.destroy);

// routes.put('/actions/:id', ActionController.update);
// routes.delete('/actions/:id', ActionController.destroy);

module.exports = routes;