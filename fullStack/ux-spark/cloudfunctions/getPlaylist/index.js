// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const rp = require('request-promise')

const playlistCollection = db.collection('playlist')

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  // 小程序一次查询有 100 条数据限制
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)

  const tasks = []

  for(let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  let list = {
    data: []
  }

  if(tasks.length > 0) {
   list = (await Promise.all(tasks)).reduce((acc,cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  // const list  = await playlistCollection.get()
  let url = 'https://api.virapi.com/vir_github1agc6ca89hf10/playlist/hotlist?_token=$2a$10$Fdvj31GDV3zeUgWrse2YPurVs7esXVT0FfucGGGMyFbFk1lj7r/O6'
  const playlist = await rp(url).then((res) => {
    return JSON.parse(res).data
  })

  // 去重
  const newData = []

  for(let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for(let j =0,len2 = list.data.length; j < len2; j ++) {
      if(playlist[i].id === list.data[i].id) {
        flag = false
        break
      }
    }
    if(flag) {
      newData.push(playlist[i])
    }
  }
  // console.log(playlist)
  for(let i = 0, len = playlist.length; i < len; i ++) {
    await db.collection('playlist').add({
      data: {
        ...newData[i],
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('失败')
    })
  }

  return newData.length
  // return await rp(url)
  //   .then(function (res) {
  //     return JSON.parse(res).data
  //   })
  //   .catch(function (err) {
  //     return '失败'
  //   });
}