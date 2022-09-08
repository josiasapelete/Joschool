const router=require('express').Router();
const authController=require('../controllers/auth.controller');
const userController= require('../controllers/user.controller');

router.post('/register',authController.signUp);
//On affiche tous les utilisateurs
router.get('/',userController.getAllUsers);

//On affiche les info de l'utilisateur
router.get('/:id',userController.userInfo);

//Mise à jour du profil.)
router.put('/:id',userController.updateUser);
//delete
router.delete('/:id',userController.deleteUser);

//follow unfollow
router.patch('/follow/:id',userController.follow);


module.exports= router;