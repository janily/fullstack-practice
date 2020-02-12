<template>
  <div class="section">
     <div class="container">
       <div class="columns">
         <div class="column">
           <simple-upload />
         </div>
         <div class="column">
           <multiple-upload />
         </div>
       </div>
       
     </div>
  </div>
</template>
<script>
import SimpleUpload from './SimpleUpload'
import MultipleUpload from './MultipleUpload'
export default {
  name: "App",
  components: {
    SimpleUpload,
    MultipleUpload
  }
}
</script>
<style scoped>

</style>