// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('order').aggregate()
    .lookup({
      from: 'type',
      localField: 'typeid',
      foreignField: '_id',
      as: 'typeinfo',
    })
    .lookup({
        from: 'server',
        localField: 'ghserver', 
        foreignField: '_id',
        as: 'serverinfo',
      })
    .match({
      'ghuser': event.userid
    })
    .end()

}