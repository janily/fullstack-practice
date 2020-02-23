<template>
  <v-row>
    <v-dialog  v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">修改时间</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">修改会议时间</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-time-picker v-model="picker" style="width:100%"></v-time-picker>
            </v-row>
            <v-row>
               
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="saveChange">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    props: ['meetup'],
    data () {
        return {
            picker: null,
            dialog: false
        }
        
    },
    methods: {
       saveChange () {
        console.log(this.picker)
        const newDate = new Date(this.meetup.date)
        const hours = this.picker.match(/^(\d+)/)[1]
        const minutes = this.picker.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },

    created() {
      // this.picker = new Date(this.meetup.date).toTimeString()
    },
    
      
  }
</script>
<style>
    .v-dialog__container {
    display: unset; 
    }
</style>