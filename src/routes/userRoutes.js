const express = require('express');
const controller = require('../controllers/userController');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

// 1) Ruta pública: creación de usuario
router.post('/users', controller.createUser);
router.get('/users/email/:email', controller.getUserByEmail);
router.get('/users',controller.getAllUsers);

/* // 2) A partir de aquí, todas las rutas de /users/* estarán protegidas
router.use('/users', authenticateJWT); */


router.get('/users/:id',    controller.getUserById);
router.put('/users/:id',    controller.updateUser);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;
