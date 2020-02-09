<template>
  <v-container class="gray lighten-5">
    <div class="white elevation-2">
      <panel title="注册">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Email" v-model="email"></v-text-field> <br>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field> <br>
          <div class="error" v-html="error"></div>
          <v-btn calss="cyan" @click="register">注册</v-btn>
      </div>
      </panel>
    </div>
  </v-container>
</template>

<script>
import AuthenService from '@/services/AuthenService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  watch: {
    email (value) {
      console.log('change', value)
    }
  },
  methods: {
    async register () {
    //   console.log('register btn', this.email, this.password)
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })
        this.$token.dispatch('setToken', response.data.token)
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.email = 'hello'
    // }, 2000)
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color:red;
  }
</style>
