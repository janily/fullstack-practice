<template>
  <div id="app">{{ message }} {{ message + message }}
        <input v-model="message">
        <input value="message" @input="handleChange">
        <div :id="message"></div>
        <!-- <ul>
            <todo-item v-for="item in list" :title="item.title" :del="item.del"></todo-item>
        </ul> -->
        <todo-list>
            <todo-item @delete="handleDelete" v-for="item in list" :key="item.title" :title="item.title" :del="item.del">
                <!-- <span slot="pre-icon">前置图标</span>
                <span slot="suf-icon">后置图标</span> -->
                <template v-slot:pre-icon="{value}">
                    <span>前置图标 {{value}}</span>
                </template>
                <!-- <template v-slot:suf-icon>
                    <span>后置图标</span>
                </template>  返回组件的函数 --> 
            </todo-item>
        </todo-list>
    </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'App',
  components: {
    TodoItem,
    TodoList
  },
  data() {
    return {
      message: 'hello world',
        list: [
            {
                title: "课程1",
                del:false
            },
            {
                title: "课程2",
                del:false
            },
            {
                title: "课程3",
                del:false
            },
            {
                title: "课程5",
                del:true
            }
      ],
    }
  },
  methods: {
    handleDelete(val) {
      console.log('handleDelete', val)
    },
    handleChange(e) {
      this.message = e.target.value
    }
  },

}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
