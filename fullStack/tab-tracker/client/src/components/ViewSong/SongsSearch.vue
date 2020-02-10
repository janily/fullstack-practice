<template>
    <panel title="搜索歌曲">
      <v-text-field label="Search" v-model="search"></v-text-field>
    </panel>
</template>
<script>
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    //   console.log(value)
    }
  }
}
</script>
<style scoped>

</style>
