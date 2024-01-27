// @see https://docs.aircode.io/guide/functions/
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // 处理上传文件名
const COS = require('cos-nodejs-sdk-v5'); // 腾讯存储服务 SDK

const cos = new COS({
  // TODO: 替换为你的秘钥
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
});

module.exports = async (params, ctx) => {
  console.log('params', params);
  const { token } = params;
  // TODO: 如果需要鉴权，则进行鉴权验证

  // 鉴权通过，解析参数
  const file = params.file;
  if (!file) {
    ctx.status(400);
    return {
      message: 'file can not be empty',
    };
  }
  const { name } = file;
  const extname = path.extname(name);
  const fileName = `${uuidv4()}${extname}`;

  // TODO: 自定义上传逻辑，使用腾讯对象存储
  await cos.putObject({
    Bucket: 'd2c-1307850796',
    Region: 'ap-beijing',
    Key: fileName,
    Body: file.buffer,
  });
  const url = await cos.getObjectUrl({
    Bucket: 'd2c-1307850796',
    Region: 'ap-beijing',
    Key: fileName,
    Protocol: 'https',
    Sign: false,
  });

  return {
    url,
  };
};
