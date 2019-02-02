// 云函数入口文件
const cloud = require('wx-server-sdk');
const { getRepositories, getDevelopers } = require('./get');
const { to } = require('./utils');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    type = 'repositories',
    language = 'unknown',
    since = 'daily'
  } = event;
  const cacheKey = `${type}::${language}::${since}`;
  const [err1, content] = await to(getFreshCache(cacheKey));
  if (err1) return console.log('错误：查询数据库缓存失败');
  if (content) {
    console.log('成功：数据来源于数据库缓存');
    return content;
  }
  const getData = type === 'repositories' ? getRepositories : getDevelopers;
  const [err2, data] = await to(getData(language, since));
  if (err2) return console.log('错误：爬虫 Github Trending 网页失败');

  const [err3] = await to(insertCacheToDB(cacheKey, data));
  if (err3) return console.log('错误：缓存插入数据库失败');

  console.log('成功：数据来源于 Github Trending 网页');
  return data;
};

function getFreshCache(cacheKey) {
  return db
    .collection('repositories')
    .where({
      cacheKey: cacheKey
    })
    .orderBy('cacheDate', 'desc')
    .get()
    .then(cacheData => {
      if (cacheData.data.length) {
        // 半小时的缓存
        const isCacheFresh = !!(
          new Date().getTime() - cacheData.data[0].cacheDate <
          1800 * 1000
        );
        if (isCacheFresh) return cacheData.data[0].content;
      }
      return null;
    });
}

function insertCacheToDB(cacheKey, content) {
  return db.collection('repositories').add({
    data: {
      cacheDate: new Date().getTime(),
      cacheKey: cacheKey,
      content
    }
  });
}
