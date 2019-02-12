// 云函数入口文件
const cloud = require('wx-server-sdk');
const Towxml = require('towxml');

const towxml = new Towxml();
cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const { content } = event;
  const data = await towxml.toJson(content || '', 'markdown');
  return data;
};
