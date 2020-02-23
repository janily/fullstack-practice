<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row justify="center" style="justify-content: center">
            <v-col
              cols="6"
              md="2"
            >
              <v-btn large router to="/meetups">浏览活动</v-btn>
            </v-col>
  
            <v-col
              cols="6"
              md="2"
            >
              <v-btn large router to="/meetup/new">组织活动</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
        <v-row style="justify-content: center;">
            <v-col cols="12" md="8">

              <v-progress-circular indeterminate :value="20" v-if="loading"></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-if="!loading">
          <v-col cols="12" md="12">
            <v-carousel  :show-arrows="false">
                <v-carousel-item
                v-for="(item) in items"
                :key="item.id"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
                @click="onLoadMeetup(item.id)"
                ></v-carousel-item>
            </v-carousel>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
export default {
    computed: {
        items () {
            return this.$store.getters.featureMeetups 
        },

        loading () {
          return this.$store.getters.loading
        }
    },
    methods: {
        onLoadMeetup(id) {
            this.$router.push('/meetups/' + id)
        }
    },
}
</script>