const router = require('express').Router();
const verify = require('./vertifyToken');


router.get('/', verify, (req,res) => {
    // res.json({
    //     posts: {title: 'first', description: 'random data hahaha'}
    // });

    res.send(req.user);
    // User.findByOne({_id: req.user});
})


module.exports = router;