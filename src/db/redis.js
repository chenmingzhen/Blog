const redis=require('redis');
const {REDIS_CONF}=require('../conf/db');

// 创建客户端
const redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host);
redisClient.on('error',err=>{
    console.log(err);
});

function set(key,val) {
    // 如果val是一个对象 将它转为字符串形式
    if(typeof val==='object'){
        val=JSON.stringify(val);
    }
    redisClient.set(key,val,redis.print);
}

function get(key){
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val === null) {
                resolve(null);
                return;
            }

            try {
                resolve(JSON.parse(val));
            } catch (ex) {
                resolve(val);
            }
        })
    });
}

module.exports={
    set,
    get
};
