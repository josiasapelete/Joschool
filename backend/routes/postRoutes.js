const router= require('express').Router();

const { getPosts, createPost, updatePost, deletePost, like } = require('../controllers/postCrontroller');


router.get('/',getPosts);
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id',like)























module.exports=router;