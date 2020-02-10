<template>
  <v-container class="gray lighten-5">
    <div class="white elevation-2">
      <panel title="歌曲搜索">
        <songs-search />
      </panel>
      <panel title="歌曲列表">
        <router-link slot="action" :to="{name: 'song-create'}">
          <v-btn class="cyan btn-add" absolute right middle @click="navigateTo({name: 'song-create'})">添加歌曲</v-btn>
        </router-link>
        <div v-for="song in songs" :key="song.id">
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
              <v-btn @click="navigateTo({name: 'song', params: {songId: song._id}})">查看</v-btn>
            </v-flex>
            <v-flex xs6>
              <img alt="" class="album-image" :src="song.albumImage">
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </div>
  </v-container>
</template>
<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
import SongsSearch from '@/components/ViewSong/SongsSearch'
export default {
  components: {
    Panel,
    SongsSearch
  },
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  },
  async mounted () {
    try {
      this.songs = (await SongsService.index()).data
      console.log(this.songs)
    } catch (err) {
      console.log(err)
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
</style>
