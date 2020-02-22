<template>
    <v-container>
        <v-row v-if="error" style="justify-content: center;">
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-row>
        <v-row style="justify-content: center;">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-text>
                        <form @submit.prevent="onSignup">
                            <v-text-field
                              name="email"
                              label="邮箱地址"
                              id="email"
                              v-model="email"
                              type="email"
                              required>
                            </v-text-field>

                            <v-text-field
                              name="password"
                              label="密码"
                              id="password"
                              v-model="password"
                              type="password"
                              required>
                            </v-text-field>

                            <v-text-field
                              name="confirmPassword"
                              label="确认密码"
                              id="confirmPassword"
                              v-model="confirmPassword"
                              type="password"
                              :rules = "[comparePasswords]"
                              >
                            </v-text-field>

                            <v-btn
                            dark
                            type="submit"
                            :loading="loading"
                            :disabled="loading"
                            color="secondary"
                            @click="loader = 'loading'"
                            >
                            注册
                            </v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },

    computed: {
        comparePasswords () {
            return this.password !== this.confirmPassword ? '两次密码输入不一致' : true
        },

        user() {
            return this.$store.getters.user
        },

        error () {
            return this.$store.getters.error
        },

        loading () {
            return this.$store.getters.loading 
        }
    },

    watch: {
        user( value ) {
            if(value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },

    methods : {
        onSignup () {
            //vuex
            // console.log({email: this.email,password: this.password})
            this.$store.dispatch('signUserUp', {email: this.email,password:this.password})
        },

        onDismissed () {
            console.log('Dismissed Alert!')
            this.$store.dispatch('clearError')
        }
    }
}
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>