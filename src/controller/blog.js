const {exec} = require('../db/mysql');
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }

    sql += `order by createtime desc;`;
    //返回Promise
    return exec(sql);
};

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`;
    return exec(sql).then(rows => {
        console.log('rows', rows);
        return rows[0];
    })
};

const newBlog = (blogData = {}) => {
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createTime = new Date().getTime();
    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `;
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
};

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性
    const title = blogData.title;
    const content = blogData.content;
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `;
    return exec(sql).then(updateData => updateData.affectedRows > 0)
};

const deleteBlog = (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}';`;
    return exec(sql).then(delData => delData.affectedRows > 0);
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
};
