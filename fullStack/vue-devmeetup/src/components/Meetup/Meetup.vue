<template>
    <v-container>
        <v-row style="justify-content: center;" v-if="loading">
            <v-col cols="12" md="8">

              <v-progress-circular indeterminate :value="20" ></v-progress-circular>
        </v-col>
      </v-row>
        <v-row style="justify-content: center;" v-else>
            <v-col cols="12" md="8">
                <v-card
                    color="#385F73"
                    dark
                    class="mx-auto"
                    max-width="960"
                    v-model="meetup"
                >
                    
                    <v-card-title class="headline">
                        <h6 class="primary--text">{{meetup.title}}</h6>
                        <template v-if="userIsCreator" data-app="true">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-dialog :meetup="meetup"></app-edit-meetup-dialog>
                        </template>
                    </v-card-title>
                    <v-img
                    :src="meetup.src"
                    height="300px"
                    ></v-img>

                    <v-card-text>
                        <div>会议详情</div>
                        <p class="display-1 text--primary">
                            {{meetup.description}}
                        </p>
                        <p class="display-1 text--primary">{{ meetup.date | date }} -- {{ meetup.location }}</p>
                        <template v-if="userIsCreator" data-app="true">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
                        </template>
                        <template v-if="userIsCreator" data-app="true">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-time-dialog :meetup="meetup"></app-edit-meetup-time-dialog>
                        </template>
                        
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-register-dialog>
                    </v-card-actions> 
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props: ['id'],
    computed: {
        meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator() {
            if(!this.userIsAuthenticated) {
                return false
            }
            return this.$store.getters.user.id == this.meetup.creatorId
        },
        loading () {
          return this.$store.getters.loading
        }
    }
}
</script>