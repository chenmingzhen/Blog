const mysql=require('mysql');
const {MYSQL_CONF}=require('../conf/db');

// 创建链接对象
const con=mysql.createConnection(MYSQL_CONF);

//开始链接
con.connect();

function exec(sql){
    return new Promise(((resolve, reject) => {
        con.query(sql,(err,result)=>{
            if(err){
                console.log('mysql',err);
                reject(err);
                return;
            }
            resolve(result);
        })
    }))
}

module.exports={
    exec,
    excape:mysql.escape
};