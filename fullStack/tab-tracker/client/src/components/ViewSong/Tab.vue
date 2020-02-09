<template>
  <div>
    <panel title="Tab">
      <textarea readonly v-model="song.tab"></textarea>
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
