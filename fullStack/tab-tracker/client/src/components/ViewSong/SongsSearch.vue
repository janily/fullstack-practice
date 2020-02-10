<template>
    <v-text-field label="Search" v-model="search"></v-text-field>
</template>
<script>
import Panel from '@/components/Panel'
import _ from 'lodash'
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
    search: _.debounce(async function (value) {
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
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>
<style scoped>

</style>
