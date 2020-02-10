<template>
  <v-toolbar prominent fixed height="50px" class="cyan">
    <v-toolbar-title>
      <!-- <span class="home" @click="navigateTo({name : 'root'})">Tracker</span> -->
      <router-link class="home" tag="span" :to="{name: 'songs'}">Tracker</router-link>
    </v-toolbar-title>
    <!-- 跳转建议使用 to 方法 -->
    <v-toolbar-items>
      <v-btn :to="{ name: 'songs'}">
          浏览
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn :to="{name: 'login'}">登录</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn :to="{name: 'register'}">注册</v-btn>
    </v-toolbar-items>
      <v-btn v-if="$store.state.isUserLoggedIn" @click="logout">退出登录</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$router.push({
        name: 'songs'
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-toolbar__content {
    padding-top: 0 !important;
  }
  .home {
      cursor: pointer;
  }
</style>
