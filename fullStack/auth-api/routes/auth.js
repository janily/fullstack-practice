const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation}= require('../validation');



router.post('/register', async (req,res) => {

    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // 验证用户输入数据

    // // const validation = schema.validate(req.body);
    // const {error} = schema.validate(req.body);
    // // res.send(validation);
    // if(error) return res.status(400).send(error.details[0].message);
    // res.send(error.details[0].message); 

    // 检测用户是否存在
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('用户已存在');

    // 加密用户数据

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    

    // 创建新用户
    const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const saveUser = await user.save();
        // res.send(saveUser);
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }

});

// 登陆
router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // 检测用户是否存在
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('用户不存在');

    // 检测秘密

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('密码错误')

    // 分配 token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-toekn', token).send(token);

    res.send('成功登陆');
});


module.exports = router;