[D2C](https://semi.design/code/en-US/start/quick-start) Image upload example, nodejs implementation. [中文](./README.md)

![image-upload-config](./image-upload-config.png)

Example list:

- ✅ Cloud functions, you only need to care about the core image upload logic, there is no need to bind a domain name, each function is an interface
   - [upload.js](./examples/aircode/upload.js): Use [AirCode](https://docs.aircode.io) file storage (free quota 2GB)
   - [uploadCOS.js](./examples/aircode/uploadCOS.js): Use [Tencent Object Storage SDK](https://cloud.tencent.com/document/product/436/8629), need to bind COS AccessID ,AccessKey

AirCode supports one-click copying of projects, [One-click copy](https://aircode.io/dashboard?owner=shijiatongxue&repo=d2c-image-upload-examples&path=examples%2Faircode&appname=d2c-image-bed-aircode-example) Example (requires login)

![copy-aircode](copy-aircode.png)

- ✅ nodejs custom web server
   - [index.js](./examples/nodejs/src/index.js): Use [koa](https://koajs.com/) + [Tencent Object Storage SDK](https://cloud.tencent. com/document/product/436/8629) Custom image upload interface, need to bind COS AccessID, AccessKey
- ❤️ If you have more implementation methods, PR is welcome

Notice:

- The image upload interface in the D2C plug-in needs to use the `https` protocol, because the page where the Figma plug-in environment is located uses the `https` protocol. Due to the [browser's security policy](https://web.dev/articles/what-is-mixed-content), using the `http` protocol will cause the error below. If you encounter this problem, you can choose to use the `https` protocol or use the `https` interface provided by Cloud Function for free.

![http-mix-content-error](./http-mix-content-error.png)

- The free storage limit of AirCode cloud function is 2GB, and the number of free function requests is 100,000 times per month. Please check the free limits and plans on the [Price page](https://aircode.io/pricing).