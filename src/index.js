const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const { koaBody } = require('koa-body'); // 解析上传文件
const cors = require('koa2-cors'); // 处理跨域
const { v4: uuidv4 } = require('uuid'); // 处理上传文件名
const COS = require('cos-nodejs-sdk-v5'); // 腾讯存储服务 SDK

const cos = new COS({
  // TODO: 替换为你的秘钥
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
});

const app = new Koa();

// 解析 multipart/form-data content-type
app.use(koaBody({ multipart: true }));
// koa2-cors 配置: https://www.npmjs.com/package/koa2-cors
app.use(
    cors({
      origin: 'https://semi.design',
      allowMethods: ['GET', 'POST', 'OPTIONS'],
    })
);
app.use(async (ctx) => {
  if (ctx.url === '/upload' && ctx.method === 'POST') {
    try {
      // 从 body 中获取鉴权的 token，如果是 header，则从 header 里获取
      const { token } = ctx.request.body;
      // TODO: 如果需要鉴权，则进行鉴权验证

      const files = ctx.request.files;
      const file = files['file'];
      const { originalFilename, filepath } = file;
      const extname = path.extname(originalFilename);
      const fileName = `${uuidv4()}${extname}`;

      // TODO: 自定义上传逻辑，使用腾讯对象存储
      await cos.putObject({
        Bucket: 'd2c-1307850796',
        Region: 'ap-beijing',
        Key: fileName,
        Body: fs.readFileSync(filepath),
      });
      const url = await cos.getObjectUrl({
        Bucket: 'd2c-1307850796',
        Region: 'ap-beijing',
        Key: fileName,
        Protocol: 'https',
        Sign: false,
      });
    
      ctx.body = { url };
    } catch (e) {
      ctx.status = 500;
    }
  } else {
    ctx.body = 'hello world!';
  }
});

app.listen(9999);