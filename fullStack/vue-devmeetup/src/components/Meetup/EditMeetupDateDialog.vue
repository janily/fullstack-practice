<template>
  <v-row>
    <v-dialog  v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">修改日期</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">修改会议日期</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-date-picker v-model="picker" style="width:100%" actions></v-date-picker>
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
            picker: new Date().toISOString().substr(0, 10),
            dialog: false
        }
        
    },
    methods: {
        saveChange () {
           const newDate = new Date(this.meetup.date)
           const newDay = new Date(this.picker).getUTCDate()
           const newMonth = new Date(this.picker).getUTCMonth()
           const newYear = new Date(this.picker).getUTCFullYear()
           newDate.setUTCDate(newDay)
           newDate.setUTCMonth(newMonth)
           newDate.setUTCFullYear(newYear)
           this.$store.dispatch('updateMeetupData', {
             id: this.meetup.id,
             date: newDate
           })
           this.dialog = false
        }
    },

    created() {
      this.picker = new Date(this.meetup.date)
    },
    
      
  }
</script>
<style>
    .v-dialog__container {
    display: unset; 
    }
</style>