<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
    <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
        <div class="message-body">{{message}}</div>
    </div>
    <div class="field">
        <div class="file is-boxed is-primary">
            <label class="file-label">
                <input type="file" ref="file" @change="selectFile" class="file-input" />
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        选择一个文件
                    </span>
                    <span v-if="file" class="file-name">{{ file.name }}</span>
                </span>
            </label>
        </div>
    </div>

    <div class="field">
        <button class="button is-info">上传</button>
    </div>
  </form>
</template>
<script>
import axios from 'axios';
export default {
  name: "SimpleUpload",

  data() {
      return {
          file: "",
          message: "",
          error: false
      }
  },

  methods: {
      selectFile() {
          const file = this.$refs.file.files[0];
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
          const MAX_SIZE = 2000;
          const tooLarge = file.size > MAX_SIZE;

          if(allowedTypes.includes(file.type) && !tooLarge){
              this.file = file;
              this.error = false;
              this.message = "";    
          } else {
              this.error = true;
              this.message = "只允许上传图片";   
              this.message = tooLarge ? `文件太大了` : `只允许上传图片`;
          }
          
      },
      async sendFile() {
          const formData = new FormData();
          formData.append('file', this.file);

          try {
              await axios.post('/upload', formData);
              this.message = "文件上传成功";
              this.file = "";
              this.error = false;
          } catch (error) {
              console.log(error);
              this.message = error.response.data.error;
              this.error = true;
          }

          
      }
  },
}
</script>
<style scoped>

</style>