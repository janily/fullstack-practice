<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/home" class="navbar-brand">任务管理系统</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <div class="nav-item">{{user.data.displayName}}</div>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut">退出登录</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">登录</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">注册</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    }
  }
};
</script>
<style scoped>
  .navbar-nav {
    align-items: center;
  }
</style>
