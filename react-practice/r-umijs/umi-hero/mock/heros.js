const herolist = require('./herolist.json');

export default {
  '/api/web201605/js/herolist.json': herolist,
  // 下面代码是带参数的请求
  // 'POST /api/web201605/js/herolist.json': (req, res) => {
  //   console.log(req);
  //   const { ename } = req.body;
  //   const hero = herolist.filter(item => item.ename === parseInt(ename, 10))[0];
  //   res.send(hero);
  // },
};
