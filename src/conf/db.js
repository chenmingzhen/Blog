//环境变量
const env=process.env.NODE_ENV;

let MYSQL_CONF;
if(env==='dev'){
    //mysql
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'cmz214164051',
        port:'3306',
        database:'myblog'
    }
}
if(env==='production'){
    //mysql
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'cmz214164051',
        port:'3306',
        database:'myblog'
    }
}

module.exports={
    MYSQL_CONF
};
