<template>
  <v-layout>
    <v-flex xs4>
      <panel title="添加歌曲">
        <v-text-field label="Title" required :rules="[required]" v-model="song.title"></v-text-field>
        <v-text-field label="Artist" required :rules="[required]" v-model="song.artist"></v-text-field>
        <v-text-field label="Album" required :rules="[required]" v-model="song.album"></v-text-field>
        <v-text-field label="AlbumImage" required :rules="[required]" v-model="song.albumImage"></v-text-field>
        <v-text-field label="YoutubeId" required :rules="[required]" v-model="song.youtubeId"></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="歌曲相关信息" class="ml-2">
        <v-text-field label="Tab" v-model="song.tab"></v-text-field>
        <v-text-field label="Lyrics" v-model="song.lyrics"></v-text-field>
      </panel>
      <span class="error" v-if="error">{{ error }}</span>
      <v-btn class="cyan" @click="create">添加歌曲</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      required: (value) => !!value || '必须填写的信息.',
      error: null
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldIn = Object.keys(this.song).every(key => !!this.song[key])
      if (!areAllFieldIn) {
        this.error = '请填写必须要填写的信息'
        return
      }
      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
        // console.log(this.song)
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
