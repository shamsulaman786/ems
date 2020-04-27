<template>

<div>
  <div>
    <v-layout>
      <v-flex xs12 sm12 >
        <v-card>
          <!-- <v-card-title primary-title>
            <div class=" mx-auto">
              <h3 class="headline mb-0" style="color:primary">Your Current Question Paper</h3>
            </div>
          </v-card-title> -->
          <v-card-text id="questionPaper">
              <div class="row">
                <div class="offset-3 "></div>
                <div class="col-sm-6 text-center">
                  <b>TEST LINKASHOKA INSTITUTE OF ENGINEERING AND TECHNOLOGY</b><br>
                  <b>EEE B.Tech Test1 Internal Examination</b>
                </div>
              </div>
              <div class="row">
                <div class="offset-sm-1 col-sm-4 ">
                    <span>
                    <b>Course:</b> Electromagnetic Fields
                    </span><br>
                    <span><b>Branch:</b> EEE B.Tech II-I(none)</span><br>
                    <span><b>Date:</b> 26-Nov-2019</span>
                </div>
                <div class="offset-sm-1 col-sm-2 ">
                    <span><b>Course Code:</b> EE305PC</span><br>
                    <span><b>Max. Marks: </b>62</span>
                </div>
                <div class="offset-sm-2 col-sm-1 ">
                    <b>Time:</b> 3Hrs
                </div>
              </div>
              <hr>
              <!-- <v-container class="">
                <v-layout >
                  <v-flex offset-sm1></v-flex>
                  <v-flex sm1></v-flex>
                  <v-flex sm5>  </v-flex>
                  <v-flex offset-sm1></v-flex>
                  <v-flex sm1>Max Marks</v-flex>
                  <v-flex sm1>CO </v-flex>
                  <v-flex sm1>Diffifulty Level</v-flex>
                  <v-flex offset-sm1></v-flex>
                </v-layout>
                <v-layout v-show="rq.question" v-for="(rq,index) in reflectedQuestions" :key="index">
                  <v-flex offset-sm1></v-flex>
                  <v-flex sm1>Q{{index}}.</v-flex>
                  <v-flex sm5 class="" v-html='rq.question'> </v-flex>
                  <v-flex offset-sm1></v-flex>
                  <v-flex sm1>{{rq.maxMarks}}</v-flex>
                  <v-flex sm1>{{rq.CO}}</v-flex>
                  <v-flex sm1>{{rq.difficultyLevel}}</v-flex>
                  <v-flex offset-sm1></v-flex>
                </v-layout>
              </v-container> -->
              <div class="container">
                <div class="row"  >
                    <div class=" offset-1 col-1"></div>
                    <div class=" col-5"> </div>
                    <div class=" offset-1 col-1">{{"Max Marks"}}</div>
                    <div class=" col-1">{{"CO"}}</div>
                    <div class=" col-1">{{"Difficulty Level"}}</div>
                    <div class=" offset-1 col-1"></div>
                </div>
                <div class="row" v-show="rq.question" v-for="(rq,index) in reflectedQuestions" :key="index" >
                    <div class=" offset-1 col-1">Q{{index}}.</div>
                    <div class=" col-5" v-html='rq.question'> {{  }} </div>
                    <div class=" offset-1 col-1" v-html='rq.maxMarks'>{{}}</div>
                    <div class=" col-1" v-html='rq.CO'>{{}}</div>
                    <div class=" col-1" v-html='rq.difficultyLevel'>{{}}</div>
                    <div class=" offset-1 col-1"></div>
                </div>
              </div>
          </v-card-text>
          <v-card-actions>
            <div class="offset-md-10 col-md-2">
              <v-btn flat color="orange" @click="print">Print</v-btn>
              <!-- <v-btn flat color="orange">Explore</v-btn> -->
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
      <v-layout class="ma-3"></v-layout>
  <div>
    <v-toolbar flat color="white" >
      <v-toolbar-title >Created Questions List</v-toolbar-title>
      <v-spacer></v-spacer>


<question-dialog @addQuestion="addQuestion"></question-dialog>
<!-- <question-dialog :disableDialog="disableDialogButton"></question-dialog> -->


    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="questionData"
      :pagination.sync="pagination"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-left" v-html="props.item.question"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import VueHtmlToPaper from 'vue-html-to-paper';
import QuestionDialog from "../../components/QuestionDialog.vue";
  export default {
    components: {
      QuestionDialog
    },
    data: () => ({
      dialog: false,
      disableDialogButton: true,
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        { text: 'Id', value: 'id',  },
        { text: 'Question', value: 'question', align: 'center'  }
      ],
      questionData: [
        {
          name: 'Question Data',
          id: 159,
          question: 6.0
        }
      ],
      reflectedQuestions: [
        {
          question:'',
          choice:'',
          difficultyLevel:'',
          section:'',
          maxMarks:'',
          CO:'',
        },
      ],
    }),

    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.questionData.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
        getQuestions: function(){
          axios.get('/api/getQuestions')
          .then(res => {
            this.questionData = res.data
          })
          .catch(err => {
            console.error(err);
          })
        },
        print: function () {
           this.$htmlToPaper('questionPaper');
        },

        addQuestion: function (value) {
          if (value.choice=='Mandatory' ) {

            for (let index = 0; index < this.selected.length; index++) {
            var arr = [{'question':''},{'choice':''},{'difficultyLevel':''},{'section':''},{'maxMarks':''},{'CO':''}];
              arr.question = this.selected[index].question;
              arr.choice = value.choice;
              arr.difficultyLevel = value.difficultyLevel;
              arr.section = value.section;
              arr.maxMarks = value.maxMarks;
              arr.CO = value.CO;
              this.reflectedQuestions.push(arr);
            }
          }
          this.selected.length = 0;
        }
    },
    mounted() {
      this.getQuestions();
    },
  }
</script>
