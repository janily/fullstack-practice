<template>
    <v-container>
        <v-row v-if="error" style="justify-content: center;">
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-row>
        <v-row style="justify-content: center;">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-text>
                        <form @submit.prevent="onSignin">
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

                            <v-btn
                            dark
                            type="submit"
                            >
                            登录
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
            password: ''
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
        onSignin () {
            //vuex
            // console.log({email: this.email,password: this.password})
            this.$store.dispatch('signUserIn', {email: this.email,password:this.password})
        },

        onDismissed () {
            console.log('Dismissed Alert!')
            this.$store.dispatch('clearError')
        }
    }
}
</script>