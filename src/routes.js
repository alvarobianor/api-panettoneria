const { Router } = require('express');

const Controller = require('./app/controllers/Panettone');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

const routes = new Router();

routes.post('/cadastro', upload.single('urlImg'), Controller.store);
routes.get('/search', Controller.index);
routes.get('/brands', Controller.brands);
routes.get('/panettone/:name', Controller.show);

module.exports = routes;
