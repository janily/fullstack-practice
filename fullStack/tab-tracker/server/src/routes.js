const User = require('./models/User');
const Song = require('./models/Song');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const {registerValidation,loginValidation}= require('./validation');

module.exports = (app) => {
    
    app.post('/register', async (req, res) => {

        // res.send('hahah');

        const { error } = registerValidation(req.body);
        // if(error) return res.status(400).send(error);
        // if(error) return res.status(400).send(error.details[0].message);
        if(error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: '邮箱格式不对'
                    })
                    break
                default: 
                    res.status(400).send({
                        error:'信息不对，请重新填写'
                    })
            }
        }
        
        // 检测用户是否存在
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) return res.status(400).send('用户已存在');
        // 加密用户数据

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // 创建新用户
        const user = new User({
            email: req.body.email,
            password: hashPassword
        });

        try {
            const saveUser = await user.save();
            res.send(saveUser);
            // res.send({user: user._id});
        } catch (err) {
            res.status(400).send(err);
        }
    });

    // 登陆
    app.post('/login', async (req,res) => {
        const { error } = loginValidation(req.body);
        // if(error) return res.status(400).send(error.details[0].message);

        // 检测用户是否存在
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send({error:'用户不存在'});

        // 检测密码

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send({error:'密码错误'})

        //分配token
        const token = jwt.sign({_id: user._id}, config.authentication.jwtSecret);

        res.send({
            token:token
        });
    });

    app.get('/songs', async (req, res) => {
        const songs = await Song.find({})
        try {
            res.send(songs)
        } catch (err) {
            res.status(400).send({
                err: '失败'
            })
        }
    });

    app.get('/songs/:id', async (req, res) => {
        try {
            const song = await Song.findById(req.params.id)
            // const books = await Book.find({ author: author.id }).limit(6).exec()
            res.send(song);
        } catch(err)  {
            // console.log(err);
            res.status(400).send({
                err: err
            })
        }
        // res.send('作者' + req.params.id)
    });

    app.post('/song', async (req, res) => {
        try {
            const song = new Song({
                title: req.body.title,
                artist: req.body.artist,
                album: req.body.album,
                albumImage: req.body.albumImage,
                youtubeId: req.body.youtubeId,
                lyrics: req.body.lyrics,
                tab: req.body.tab,
            });

            const newSong = await song.save()

            res.send(song);
        } catch (err) {
            res.status(400).send({
                err: err
            })
        }
    })

    // 更新信息
    app.put('/songs/:id', async (req, res) => {
        let song
        try {
            song = await Song.findById(req.params.id)
            song.title = req.body.title,
            song.artist = req.body.artist,
            song.album = req.body.album,
            song.albumImage = req.body.albumImage,
            song.youtubeId = req.body.youtubeId,
            song.lyrics = req.body.lyrics,
            song.tab = req.body.tab,
        // res.redirect(`books/${newBook.id}`)
            await song.save()
            res.send(song)
            // res.redirect(`/songs/${song.id}`)
        } catch (err){
            res.status(400).send({
                err: err
            })
        }
    })
}