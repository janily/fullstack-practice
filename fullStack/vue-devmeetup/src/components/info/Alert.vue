<template>
     <v-alert type="error" :value="true" dismissible>
      {{ text }}
    </v-alert>
</template>
<script>
export default {
    props: ['text'],
    methods: {
    }
    
}
</script>