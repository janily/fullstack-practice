<template>
  <div>
    <vue-dropzone ref="dropzone" id="drop1" :options="dropOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
    <button @click="removeAllFiles">取消上传</button>
  </div>
</template>
<script>
import vueDropzone from 'vue2-dropzone'
export default {
  data: () => ({
    dropOptions: {
      url:"localhost:3000/post",
      maxFilesize: 2, // MB
      maxFiles: 4,
      chunking: true,
      chunkSize: 500, // Bytes
      thumbnailWidth: 150, // px
      thumbnailHeight: 150,
      addRemoveLinks: true
    }
  }),
  components: {
    vueDropzone
  },
  methods: {
    removeAllFiles() {
      this.$ref.dropzone.removeAllFiles();
    },
    afterComplete(file) {
      console.log(file);
    }
  },
};
</script>