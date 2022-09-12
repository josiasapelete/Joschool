const router= require('express').Router();

const { getPosts, createPost, updatePost, deletePost, like, createComment, deleteComment, editComment } = require('../controllers/postCrontroller');


router.get('/',getPosts);
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id',like)


//comment router

router.patch('/comment-post/:id',createComment);
router.patch('/edit-comment/:id',editComment);
router.patch('/delete-comment/:id',deleteComment)




















module.exports=router;