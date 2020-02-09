<template>
  <div>
    <panel title="歌词MV">
      {{song.youtubeId}}
      <youtube :video-id="song.youtubeId" :play-width="500" :play-height="200">
      </youtube>
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
</style>
