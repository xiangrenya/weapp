// 云函数入口文件
const cloud = require('wx-server-sdk');
const { getRepositories } = require('./get');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, language = 'unknown', since = 'daily' } = event;
  if (type === 'repositories') {
    const cacheKey = `repositories::${language}::${since}`;

    const content = await getFreshCacheData(cacheKey);
    if (content) return content;

    const repositories = await getRepositories(language, since);
    console.log('get data from github trending', repositories.length);

    await insertDB(cacheKey, repositories);

    return repositories;
  }
};

// 获取新鲜的缓存数据
async function getFreshCacheData(cacheKey) {
  let result = null;
  const cacheData = await db
    .collection('repositories')
    .where({
      cacheKey: cacheKey
    })
    .orderBy('cacheDate', 'desc')
    .get()
    .catch(err => {
      console.log('getFreshCacheData error: ', err);
    });

  // 30分钟有效期
  if (cacheData.data.length) {
    const isFresh = !!(
      new Date().getTime() <
      cacheData.data[0].cacheDate <
      1800 * 1000
    );

    if (isFresh) {
      result = cacheData.data[0].content;
      console.log('get data from db', cacheData.data[0].content.length);
    }
  }

  return result;
}

// 缓存数据到数据库
function insertDB(cacheKey, content) {
  db.collection('repositories')
    .add({
      data: {
        cacheDate: new Date().getTime(),
        cacheKey: cacheKey,
        content
      }
    })
    .then(result => {
      console.log('insert data into db successfully');
    })
    .catch(err => {
      console.log('insertDB error: ', err);
    });
}
