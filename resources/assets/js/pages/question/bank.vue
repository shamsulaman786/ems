<template>
  <div id="app">
    <v-card dark>
      <v-card-title>
        Current Question
      </v-card-title>
      <v-card-text v-html="content">

      </v-card-text>
    </v-card>
    <v-flex my-3></v-flex>
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
  />
    <v-btn color="success" @click="saveQuestion" >Save</v-btn>
		<v-snackbar
      v-model="showSnackbar"
      top
      right
      :color="snackbarColor"
      :timeout = "snackbarDuration"
    >
      {{ snackbarMessage }}
    </v-snackbar>

  </div>
  
</template>

<script>

import axios from 'axios';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },

  data() {
    return {
      content: "<p>Non aliquip et esse elit id commodo do.Mollit est fugiat elit ex aute aliquip.?</p>",
      showSnackbar: false,
      snackbarColor: '',
      snackbarMessage: '',
      snackbarDuration: 3000,
    };
  },
  methods: {
    saveQuestion () {
      let params = {
        question: this.content
      }
      axios.post('/api/setQuestion',params)
      .then(res => {
        console.log(res)
        this.showSnackbar=true,
        this.snackbarColor='success',
        this.snackbarMessage='Question created successfully!'
      })
      .catch(err => {
        console.error(err);
						this.snackbarMessage = "Oops! Something went wrong!";
					  this.snackbarColor = 'error';
            this.showSnackbar = true;
      })
    }
  }
};
</script>
