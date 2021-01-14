module.exports = {
  //加密
  encrypt: {
    on: false,
    publicKey: "",
    iv: "",
    toBase64: false
  },
  //请求域名
  // baseUrl: "https://api.ipify.org/",
  baseUrl: process.env.BASE_URL + "api/",
  authorization: {
    key: "Authorization",
    prefix: "Bearer "
  },
  //响应成功code值
  responseSuccessCode: 10000,
  //超时时间
  timeout: 20000
};
