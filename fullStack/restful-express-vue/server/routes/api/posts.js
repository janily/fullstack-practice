const express = require('express');
const router = express.Router();
const Post = require('../../../models/Post');

// 获取所有数据接口
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        es.json({message: err })
    }
})

//添加数据接口
router.post('/', async (req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    console.log(post);

    // post.save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch( err => {
    //         res.json({ message: err });
    //     })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err })
    }
})

//获取指定数据接口
router.get('/:postId', async (req,res) => {
    // console.log(req.params.postId);

    try {

        const post = await Post.findById(req.params.postId);

        res.json(post);
    } catch(err) {
        res.json({message: err })
    }

})

// 删除数据接口

router.delete('/:postId', async (req,res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.postId });
        res.json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
    
})

// 更新数据
router.patch('/:postId', async (req,res) => {
    try {
        const updatePost = await Post.updateOne(
            {_id : req.params.postId},
            {$set : {title: req.body.title}});
            res.json(updatePost);
    } catch (err) {
        
    }
})


module.exports = router;