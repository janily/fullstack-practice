<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
    <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
        <div class="message-body">{{message}}</div>
    </div>
    <div class="field">
        <div class="file is-boxed is-primary">
            <label class="file-label">
                <input multiple type="file" ref="files" @change="selectFile" class="file-input" />
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        选择一个文件
                    </span>
                </span>
            </label>
        </div>
    </div>

    <div class="field">
        <div v-for="(file, index) in files" :key="index" :class="`level ${file.invalidMessage && 'has-text-danger'}`">
            <div class="level-left">
                <div class="level-item">{{file.name}}</div>
                <span v-if="file.invalidMessage">&nbsp;-{{file.invalidMessage}}</span>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <a @click.prevent="files.splice(index, 1)" class="delete"></a>
                </div>
            </div>
        </div>
    </div>

    <div class="field">
        <button class="button is-info">上传</button>
    </div>
  </form>
</template>
<script>
// import axios from 'axios';
import _ from 'lodash';
export default {
  name: "MultipleUpload",

  data() {
      return {
          files: [],
          message: "",
          error: false
      }
  },

  methods: {
      selectFile() {

          const files = this.$refs.files.files;
        //   this.files = [...this.files, ...files];

          this.files = [
              ...this.files,
              ..._.map(files, file => ({
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  invalidMessage: this.validate(file)
              }))
          ]
          
      },

      validate(file) {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
          const MAX_SIZE = 2000;

          if (file.size > MAX_SIZE) {
              return `最大尺寸`
          }

          if(!allowedTypes.includes(file.type)) {
              return "只允许上传图片";
          }
          return ""
      },
      async sendFile() {
          
      }
  },
}
</script>
<style scoped>

</style>