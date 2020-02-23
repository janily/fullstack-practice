<template>
  <v-row>
    <v-dialog  v-model="registerDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">{{ userIsRegistered ? '取消' : '确认' }}</v-btn>
      </template>
      <v-card>
        <v-card-title v-if="userIsRegistered">
          <span class="headline">还没参加会议</span>
        </v-card-title>
        <v-card-title v-else>
          <span class="headline">参加会议</span>
        </v-card-title>
       <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="registerDialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="onAgree">参加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        registerDialog: false
      }
      
    },
    computed: {
      userIsRegistered() {
        return this.$store.getters.user.registerMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    
    methods: {
      onAgree() {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        }
      }
    },
  }
</script>
<style>
    .v-dialog__container {
    display: unset; 
    }
</style>