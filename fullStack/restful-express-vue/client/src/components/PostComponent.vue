<template>

    <div class="container">
        <h1>最近信息</h1>
        <!-- 发表信息 -->
        <div class="create-post">
            <label for="create-post">说点什么吧...</label>
            <input type="text" id="create-post" v-model="title" placeholder="输入文字">
            <button v-on:click="createPost">发表!</button>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <div class="post-container">
            <div class="post" v-for="(post, index) in posts" v-bind:index="index" v-bind:key="post._id" v-on:dblclick="deletePost(post._id)">
                <!-- {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }} -->
                <p class="text">{{ post.title }}</p>
                <p class="text">{{ post.date }}</p>
            </div>
        </div>
    </div>

</template>

<script>

import  PostService from '../PostService'

export default {
    name: 'PostComponent',
    data() {
        return {
            posts: [],
            error: '',
            title: ''
        }
    },
    async created() {
        try {
            this.posts = await PostService.getPosts()
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async createPost() {
            await PostService.addPost(this.title);
            this.posts = await PostService.getPosts();
        },
        async deletePost(id) {
            try {
                await PostService.deletePost(id);
                this.posts = await PostService.getPosts();
            } catch (err) {
                this.error = err.message
            }
            
        }
        
    }
}
</script>

<style scoped>
    div.container {
        max-width: 800px;
        margin:0 auto;
    }
    p.error {
        border: 1px solid red;
        background-color: rgb(230, 166, 166);
        padding: 10px;
        margin-bottom: 15px;
    }
    div.post {
        position: relative;
        border: 1px solid rgb(134, 209, 111);
        /* padding: 10px 10px 30px 10px; */
        background-color: #3fa012;
        color: #fff;
        margin-bottom: 10px;;
    }
    div.created-at {
        position: absolute;
        top:0;
        left: 0;
        padding: 5px 15px 5px 15px;
        background-color: green;
        color: #fff;
        font-size: 13px;
    }
    p.text {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }
    .create-post {
        margin-bottom: 10px;
    }
</style>