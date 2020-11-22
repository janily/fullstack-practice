// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})

  // 全局路由
  app.use(async (ctx, next) => {
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
  })

  app.router('list', async(ctx, next) => {
    ctx.data.listName = '哈哈哈'
    await next()
  },async(ctx, next) =>{
    ctx.data.listType = '选项卡'
    ctx.body = {
      data: ctx.data
    }
    
  })

  app.router('movie', async(ctx, next) => {
    ctx.data.movieNmae = '唐山大兄'
    await next()
  }, async(ctx, next) => {
    ctx.data.movieType = '动作片'
    ctx.body = {
      data: ctx.data
    }
  })
  return app.serve()
}