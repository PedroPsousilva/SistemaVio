const router = require('express').Router()

const { route } = require('..');
const userController = require("../controllers/userController")
const orgController = require("../controllers/orgController")
const eventoController = require('../controllers/eventoController')
const ingressoController = require('../controllers/ingressoController')

router.post('/user', userController.createUser);
//router.post('user/login', userController.postLogin);
router.get('/user', userController.getAllUsers);
//router.get('/user/:cpf', userController.gerUserById); 
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.post('/organizador', orgController.createOrganizador);
router.get('/organizador', orgController.getAllOrganizadores);
router.put('/organizador', orgController.updateOrganizador);
router.delete('/organizador/:id', orgController.deleteOrganizador);

//rotas eventoController
router.post('/evento', eventoController.createEvento);
router.get('/evento', eventoController.getAllEventos);
router.put('/evento', eventoController.updateEvento);
router.delete('/evento/:id', eventoController.deleteEvento);

//rotas ingressoController
router.post('/ingresso', ingressoController.createIngresso);
router.get('/ingresso', ingressoController.getAllingresso);
router.put('/ingresso', ingressoController.updateIngresso);
router.delete('/ingresso/:id', ingressoController.deleteIngresso);


module.exports = router