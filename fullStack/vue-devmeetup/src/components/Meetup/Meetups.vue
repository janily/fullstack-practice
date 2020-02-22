<template>
    <v-container>
        <v-row style="justify-content: center;" v-for="meetup in meetups" :key="meetup.id" class="mb-2">
            <v-col cols="12" md="8">
                <v-card
                    color="#385F73"
                    dark
                    class="mx-auto"
                    max-width="960"
                >
                    <v-img
                    :src="meetup.src"
                    height="300px"
                    ></v-img>
                    <v-card-title class="headline">{{ meetup.title }}</v-card-title>

                    <v-card-subtitle>{{ meetup.date | date }}</v-card-subtitle>

                    <v-card-actions>
                        <v-btn class="ma-2" color="orange" :to="'/meetups/' + meetup.id">
                            会议详情<v-icon dark left>mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        }
    }
}
</script>