<template>
    <div class="col align-self-center">
        <h3 class="pb-5 text-left underling">创建任务</h3>
        <form class="sign-in" @submit.prevent>
            <div class="form-group todo__row">
                <input type="text" class="form-control" @keypress="typing=true" placeholder="创建任务" v-model="name" @keyup.enter="addTodo($event)">
                <small class="form-text text-muted" v-show="typing">点击空格键保存任务</small>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import bus from './../bus.js';
export default {
    data() {
        return {
            name: "",
            typing: false
        };
    },
    methods: {
        addTodo(event) {
            if(event) event.preventDefault();
            let todo = {
                name: this.name,
                dong: false
            };
            console.log(todo);
            this.$http
              .post("/", todo)
              .then(response => {
                  this.clearTodo();
                  this.refreshTodo();
                  this.typing = false;
              })
              .catch(error => {
                  console.log(error);
              });
        },

        clearTodo() {
            this.name = "";
        },

        refreshTodo() {
            bus.$emit("refreshTodo");
        }
        
    },
};
</script>
<style lang="scss" scoped>
.underline {
    text-decoration: underline;
}
</style>