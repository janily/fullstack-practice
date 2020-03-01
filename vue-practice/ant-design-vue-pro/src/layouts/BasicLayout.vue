<template>
    <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
      
   <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-if="navLayout === 'left'" :theme="navTheme" :trigger="null" collapsible v-model="collapsed" width="256px">
      <div class="logo">Ant vue Pro</div>
      <SiderMenu :theme="navTheme" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >
        <Header />
      </a-layout-header> 
      <a-layout-content style="margin: 0 16px">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
       <Footer />
      </a-layout-footer>
    </a-layout>
    <Authorized :authority="['admin']">
    <Drawer />
    </Authorized>
  </a-layout>
  </div>
</template>
<script>
import Header from './Header'
import SiderMenu from './SiderMenu'
import Footer from './Footer'
import Drawer from '../components/SettingDrawer/index'
export default {
  components: {
    Header,
    SiderMenu,
    Footer,
    Drawer
  },
  data() {
      return {
        collapsed: false,
      };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    }
  },
}
</script>
<style lang="less" scoped>
  .nav-theme-dark .logo {
    height: 64px;
    line-height: 64px;
    color: #fff;
    text-align: center;
  }
</style>
