// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取数据库引用
const db = cloud.database()

// 创建集合的函数
async function createCollection(collectionName) {
  try {
    await db.createCollection(collectionName)
    console.log(`${collectionName} 集合创建成功`)
  } catch (err) {
    console.error(`${collectionName} 集合创建失败： `, err)
  }
}

// 需要创建的集合名称列表
const collectionList = ['order', 'server', 'blList', 'user', 'orderList']

// 遍历集合名称列表，创建集合
collectionList.forEach(collectionName => {
  createCollection(collectionName)
})
