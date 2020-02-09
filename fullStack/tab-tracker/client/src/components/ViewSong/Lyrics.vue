<template>
  <div>
    <panel title="歌词">
      <textarea readonly v-model="song.lyrics"></textarea>
    </panel>
  </div>
</template>
<script>
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  props: [
    'song'
  ]
}
</script>
<style>
  textarea {
    width: 100%;
    border:none;
    overflow: hidden;
  }
</style>
