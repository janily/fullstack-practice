 <template>
    <li>
        <slot name="pre-icon" :value="value"></slot>
        <span v-if="!del">{{ title }}</span>
        <span v-else style="text-decoration: line-through;">{{ title }}</span>
        <slot name="suf-icon">😄</slot>
        <button v-show="!del" @click="handleClick">删除</button>
    </li>
 </template>
 <script>
 export default {
     props: {
        title: String,
        del: {
            type: Boolean,
            default: false,
        },
    },
    data: function() {
        return {
            value: parseInt(Math.random() * 10)
        }
    },
    methods: {
        handleClick() {
            console.log('click delete')
            this.$emit('delete', this.title)
        }
    }
 }
 </script>
 <style scoped>
 
 </style>