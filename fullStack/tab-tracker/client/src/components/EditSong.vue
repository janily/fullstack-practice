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
      <v-btn class="cyan" @click="save">保存修改</v-btn>
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
    async save () {
      const songId = this.$store.state.route.params.songId
      console.log(this.song)
      try {
        await SongsService.put(this.song)
        console.log(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
        // console.log(this.song)
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
