<template>
    <panel title="歌曲信息">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-album">
            {{song.album}}
          </div>
          <v-btn v-if="isUserLoggedIn" @click="navigateTo({name: 'song-edit', params: {songId: song._id}})">编辑</v-btn>
        </v-flex>
        <v-flex xs6>
          <img alt="" class="album-image" :src="song.albumImage">
        </v-flex>
      </v-layout>
    </panel>
</template>
<script>
import Panel from '@/components/Panel'
import {mapState} from 'vuex'
export default {
  components: {
    Panel
  },
  props: [
    'song'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
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
