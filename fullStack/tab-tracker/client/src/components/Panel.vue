<template>
  <v-container class="gray lighten-5">
    <div class="white elevation-2">
      <v-toolbar flat dense class="cyan" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <slot name="action"></slot>
      <div class="songs-wrap">
        <slot></slot>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  props: [
    'title'
  ]
}
</script>
<style scoped>
  .songs-wrap {
    padding-top: 20px;
    position: relative;
  }
  .btn-add {
    top: 170px;
  }
</style>
