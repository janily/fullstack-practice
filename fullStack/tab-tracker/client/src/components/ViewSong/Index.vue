<template>
<div>
  <v-layout>
    <v-flex xs6>
      <song-info :song="song" />
    </v-flex>
    <v-flex xs6>
      <you-tu :song="song.youtubeId" />
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs6>
      <lyrics :song="song" />
    </v-flex>
    <v-flex xs6>
      <tab :song="song" />
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import Lyrics from '@/components/ViewSong/Lyrics'
import Tab from '@/components/ViewSong/Tab'
import SongInfo from '@/components/ViewSong/SongInfo'
import YouTu from '@/components/ViewSong/YouTu'
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel,
    SongInfo,
    YouTu,
    Lyrics,
    Tab
  },
  data () {
    return {
      song: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
    // console.log(song)
  }
}
</script>
<style scoped>
  .album-image {
    max-width: 60%;
  }
  .song-title {
    font-size: 30px;
  }
  textarea {
    width: 100%;
    border:none;
    overflow: hidden;
  }
</style>
