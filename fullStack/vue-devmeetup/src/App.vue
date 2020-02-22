<template>
<div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
    </v-navigation-drawer>
    <v-toolbar  color="deep-purple accent-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :key="index" router :to="item.link" v-for="(item, index) in menuItems">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text v-if="userIsAuthenticated" @click="onLogout">
          退出账户
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
</div>
</template>

<script>
export default {
    data () {
      return {
        drawer: null,
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {title: '注册', link: '/signup'},
          {title: '登录', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {title: '最近活动', link: '/meetups'},
            {title: '组织活动', link: '/meetup/new'},
            {title: '个人信息', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    },
  }
</script>
