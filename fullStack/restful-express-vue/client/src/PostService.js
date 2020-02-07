import axios from 'axios';

const url = '/api/posts';

class PostService {

    //获取数据
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    //添加数据
    static addPost(title) {
        return axios.post(url,{
            title
        });
    }


    //删除数据
    static deletePost(id) {
        return axios.delete(`${url}/${id}`);
    }
}

export default PostService;