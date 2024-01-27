// @see https://docs.aircode.io/guide/functions/
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // 处理上传文件名
const COS = require('cos-nodejs-sdk-v5'); // 腾讯存储服务 SDK
const aircode = require('aircode');

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

  // 使用 aircode 存储，免费额度 2GB
  const result = await aircode.files.upload(file.buffer, fileName);
  return {
    url: result.url,
  };
};
