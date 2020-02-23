<template>
  <v-row>
    <v-dialog  v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">编辑</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">编辑信息</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-text-field
                :counter="10"
                v-model="editTitle"
                label="会议名称"
                required
                ></v-text-field>
            </v-row>
            <v-row>
                <v-textarea
                name="description"
                v-model="editDescription"
                label="会议详情"
                id="description"
                value=""
                ></v-textarea>
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
            editTitle: this.meetup.title,
            editDescription: this.meetup.description,
            dialog: false
        }
        
    },
    methods: {
        saveChange () {
            if(this.editTitle.trim() === '' || this.editDescription.trim() === '') {
                return
            }
            this.dialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editTitle,
                description: this.editDescription
            })
        }
    },
    
      
  }
</script>
<style>
    .v-dialog__container {
    display: unset; 
    }
</style>