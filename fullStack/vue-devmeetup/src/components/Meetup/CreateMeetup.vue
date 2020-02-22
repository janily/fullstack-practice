<template>
    <v-container>
        <v-row style="justify-content: center;">
            <v-col cols="12">
                <h4 class="primary--text">组织一个活动</h4>
            </v-col>
            <v-col cols="12">
                <v-form @submit.prevent="onCreateMeetup">
                <v-text-field
                v-model="title"
                :counter="10"
                label="会议名称"
                required
                ></v-text-field>

                <v-text-field
                v-model="location"
                :counter="100"
                label="会议地点"
                id="location"
                required
                ></v-text-field>

                 <v-layout class="mb-2">
                    <v-flex>
                        <v-btn dark @click="onPickFile">上传图片</v-btn>
                        <input type="file" 
                        style="display:none" 
                        ref="fileInput" 
                        accept="image/*"
                        @change="onFilePicked"
                        >
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex>
                        <img :src="src" height="150" >
                    </v-flex>
                </v-layout>

                <v-textarea
                name="description"
                label="会议详情"
                id="description"
                v-model="description"
                value=""
                ></v-textarea>

                <v-layout>
                    <v-flex>
                        <h4>开会时间</h4>
                    </v-flex>
                </v-layout>

                <v-row justify="left" class="mb-2">
                    <v-col cols="12" md="8">
                    <v-date-picker v-model="picker"></v-date-picker>
                    <p>{{picker}}</p>
                    </v-col>
                </v-row>

                <v-row justify="left" class="mb-2">
                    <v-col cols="12" md="8">
                    <v-time-picker v-model="time" format="24hr"></v-time-picker>

                    <p>{{time}}</p>
                    
                    </v-col>
                </v-row>


                <v-btn
                color="warning"
                dark
                type="submit"
                >
                创建活动
                <!-- {{submitDateTime}} -->
                </v-btn>
            </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            title:'',
            location: '',
            src: '',
            description: '',
            picker: new Date().toISOString().substr(0, 10),
            time: new Date(),
            image: null
        }
    },

    computed: {
        formIsVaild() {
            return this.title !== '' && 
            this.location !== '' && 
            this.description !== ''
        },

        submitDateTime() {
            const date = new Date(this.picker)
            if(typeof this.time === 'string') {
                let hours = this.time.match(/^(\d+)/)[1]
                const minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }
            return date
        }
    },

    methods: {
        onCreateMeetup () {
            // if(!this.formIsVaild) {
            //     return
            // }

            if(!this.image) {
                return
            }
            const meetupData = {
                title: this.title,
                location: this.location,
                description: this.description,
                image: this.image,
                date: this.submitDateTime
            }

            this.$store.dispatch('createMeetup', meetupData)
            this.$router.push('/meetups')
        },

        onPickFile () {
            this.$refs.fileInput.click()
        },

        onFilePicked (event) {
            const files = event.target.files
            let filename = files[0].name;
            if(filename.lastIndexOf('.') <= 0) {
                return alert('请上传图片类型的文件')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', ()=> {
                this.src = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }


        
    },
}
</script>