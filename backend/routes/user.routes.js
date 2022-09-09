const router=require('express').Router();
const authController=require('../controllers/auth.controller');
const userController= require('../controllers/user.controller');


//authentification
router.post('/register',authController.signUp);
router.post("/login",authController.login)
router.get("/logout",authController.logout)

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