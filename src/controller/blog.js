const getList = (author, keyword) => {
    //先返回假数据 格式是正确的
    return [{
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1589880232415,
        author: 'Tom',
    },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1589880273858,
            author: 'Amy',
        }
    ]
};

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1589880232415,
        author: 'Tom'
    }
};

const newBlog = (blogData = {}) => {
    console.log(blogData);
    return {
        id: 1
    };
};

const updateBlog = (id, blogData={}) => {
    // id就是要更新博客的id
    // blogData是一个博客对象 包含title,content属性
    console.log("updateBlog", id, blogData);
    return true;
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog
};
