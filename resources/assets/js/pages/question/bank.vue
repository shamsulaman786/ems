<template>
  <div id="app">
    <v-card>
      <v-card-title>
        Current Question
      </v-card-title>
      <v-card-text v-html="content">

      </v-card-text>
    </v-card>
    <v-flex my-3></v-flex>
    <vue-editor v-model="content"></vue-editor>
    <v-btn color="success" @click="saveQuestion" >Save</v-btn>
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";

// Advanced Use - Hook into Quill's API for Custom Functionality
import { VueEditor, Quill } from "vue2-editor";
import axios from 'axios';
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: "<p>Voluptate ut consequat consequat ex tempor est exercitation non voluptate in ea velit cupidatat id?</p>"
    };
  },
  methods: {
    saveQuestion () {
      console.log('i am in');
      let params = {
        question: this.content
      }
      axios.post('/api/setQuestion',params)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err);
      })
    }
  }
};
</script>
