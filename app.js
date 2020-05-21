const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

//获取cookie的过期时间
const getCookieExpires=()=>{
    const d=new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    console.log('d.toGMTString() is ',d.toGMTString());
    return d.toGMTString();
};

// 处理post data
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            // 如果数据为空
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        })
    });
};

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query = querystring.parse(url.split('?')[1]);

    //解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';  // k1=v1;k2=v2;k3=v3
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    });


    //处理postData
    getPostData(req).then(postData => {
        req.body = postData;
        //处理blog路由
        const blogData = handleBlogRouter(req, res);
        if (blogData) {
            blogData.then(data => {
                res.end(JSON.stringify(data));
            });
            return;
        }

        //处理user路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            userData.then(data => {
                res.end(JSON.stringify(data));
            });
            return;
        }

        //未命中路由返回404
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 NOT FOUND\n');
        res.end();
    });
};

module.exports = serverHandle;
