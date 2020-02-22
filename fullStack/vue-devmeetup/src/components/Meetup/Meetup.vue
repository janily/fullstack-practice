<template>
    <v-container>
        <v-row style="justify-content: center;">
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
                    </v-card-title>
                    <v-img
                    :src="meetup.src"
                    height="300px"
                    ></v-img>

                    <v-card-text>
                        <div>会议详情</div>
                        <p class="display-1 text--primary">{{ meetup.date | date }} -- {{ meetup.location }}</p>
                        <p class="display-1 text--primary">
                            {{meetup.description}}
                        </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary" color="orange">
                            参加会议
                        </v-btn>
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
        }
    }
}
</script>