const router= require('express').Router();

const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postCrontroller');


router.get('/',getPosts);
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost)























module.exports=router;