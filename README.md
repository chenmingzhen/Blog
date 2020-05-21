## 环境安装
```text
1.自动重启工具 nodemon
    cnpm install -g  nodemon
    nodemon index.js启动
2. 跨平台设置和使用环境变量
    cnpm install --save-dev cross-env
3.数据库
    cnpm install --save mysql
4.Redis
    cnpm i redis --save
```

## 要点
```text
1.原生querystring将url后面的参数 转化为json数据
2.JSON.stringify 从一个对象中解析出字符串  JSON.parse 从一个字符串中解析出json对象
```

## 代码块
```javascript
//1
req.query = querystring.parse(url.split('?')[1]);
    console.log(JSON.stringify(req.query));
```
