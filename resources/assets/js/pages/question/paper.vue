<template>

<div>
  <div>
    <v-layout>
      <v-flex xs12 sm12 >
        <v-card>
          <v-card-text id="questionPaper">
              <div class="row">
                <div class="offset-3 "></div>
                <div class="col-sm-6 text-center">
                  <h3>SHAHEED BHAGAT SINGH STATE TECHNICAL CAMPUS</h3><br>
                  <b>CSE B.Tech Test1 Internal Examination</b>
                </div>
              </div>
              <div class="row">
                <div class="offset-sm-1 col-sm-4 ">
                    <span>
                    <b>Course:</b> Computer Programming
                    </span><br>
                    <span><b>Branch:</b> CSE B.Tech II-I(none)</span><br>
                    <span><b>Date:</b> 30-Apr-2020</span>
                </div>
                <div class=" col-sm-2 ">
                    <span><b>Course Code:</b> CSE305PC</span><br>
                    <span><b>Max. Marks: </b>100</span>
                </div>
                <div class="offset-sm-2 col-sm-1 ">
                    <b>Time:</b> 3Hrs
                </div>
              </div>
              <hr>
              <div class="container ">
                <div class="row font-weight-bold "  >
                    <div class="  col-1"></div>
                    <div class=" col-6"> </div>
                    <div class="text-sm-center col-1">{{"Max Marks"}}</div>
                    <div class=" col-1 ">{{"CO"}}</div>
                    <div class=" col-1">{{"Difficulty Level"}}</div>
                    <div class=" offset-1 col-1"></div>
                </div>
                <div v-for="(section) in sectionItems" :key="section">
                <div class="row justify-content-center font-weight-bold">Section- {{section}}</div>
                <div class="row my-2 align-middle" v-show="section==rq.section"  v-for="(rq,index) in reflectedQuestions" :key="index" >
                    <div class="col-12 d-flex justify-content-center font-weight-bold" v-if="rq.choice=='OR'">{{rq.choice}}</div>
                    <div class="col-12 d-flex justify-content-center font-weight-bold py-3" v-if="rq.choice!==('OR'||'Mandatory') ">{{rq.choice}}</div>
                    <div class=" col-1 text-sm-right" >{{rq.qno}}</div>
                    <div class=" col-1" >{{rq.sqno}}</div>                    
                    <div class=" col-5" v-html='rq.question'> </div>
                    <div class="text-sm-center  col-1" v-html='rq.maxMarks'>{{}}</div>
                    <div class=" col-1" v-html='rq.CO'>{{}}</div>
                    <div class=" col-1" v-html='rq.difficultyLevel'>{{}}</div>
                    <div class=" offset-1 col-1"></div>
                </div>
                </div>
              </div>
          </v-card-text>
          <v-card-actions>
            <div class="offset-md-8 col-md-4">
              <v-btn flat color="orange" @click="print">Print</v-btn>
              <v-btn flat color="orange" @click="reflectedQuestions=[]; qno=1">Reset</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
  <v-layout class="ma-3"></v-layout>
    <v-layout>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-title>Enter Section Details</v-card-title>
          <v-card-text>
            <v-container>
              <v-layout>

                      <v-flex offset-1 md3 >
                        <v-text-field
                        v-model="sectionData.num"
                        label="No. of required sections"
                        type="number"
                        :rules="secCountRules"
                        :error-messages="errors.collect('sections')"
                        data-vv-name="sections"
                        required
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex md3 offset-md1>
                        <v-autocomplete
                          v-model="sectionData.style"
                          :items="['A','I','1']"
                          label="Style of section order"
                          v-validate="'required'"
                          :error-messages="errors.collect('sectionStyle')"
                          data-vv-name="sectionStyle"
                          required
                        >
                        </v-autocomplete>
                      </v-flex>
                      <v-flex md2 offset-md1>
                        <v-btn
                          @click="setSectionData"
                          color="success"
                          :disabled="!(sectionData.num && sectionData.style)"
                        >
                          continue
                        </v-btn>
                      </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  <v-layout class="ma-3"></v-layout>
  <div>
    <v-toolbar flat color="white" >
      <v-toolbar-title >Created Questions List</v-toolbar-title>
      <v-spacer></v-spacer>
      <question-dialog @addQuestion="addQuestion" @closeDialog="closeDialog" :questionNo="qno" :sectionItems="sectionItems" :noOfQuestions="selected.length"></question-dialog>
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
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left" v-html="props.item.question"></td>
        </tr>
      </template>
    </v-data-table>
      <v-snackbar v-model="snack" :timeout="snackTimeout" :color="snackColor" :top='topRightSnackbar' :right='topRightSnackbar'>
        {{ snackText }}
      </v-snackbar>

  </div>
</div>
</template>
<script>
import axios from 'axios'
import VueHtmlToPaper from 'vue-html-to-paper';
import QuestionDialog from "../../components/QuestionDialog.vue";
import Section from "../../components/Section.vue";
  export default {
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      QuestionDialog,
      Section
    },
    data: () => ({
      secCountRules: [
        v => !!v || 'No of section is required',
        v => (v && v <= 10) || 'No of section must be less than 10',
        v => (v && v >= 1) || 'No of section must be greater equal 1',
      ],
      topRightSnackbar:false,
      necessaryOptionMaxMarks:'',
      qno:0,
      sqno:97,
      snackTimeout: 3000,
      custom:{
        sections:{
          required: () => 'No. of section can\'t be null'
        },
        sectionStyle:{
          required: () => 'Section style can\'t be null'
        },
      },
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v <= 9 || 'Input too long!',
      dialog: false,
      disableDialogButton: true,
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        { text: 'Sr no.', value: 'id', align: 'center' },
        { text: 'Question', value: 'question', align: 'center'  }
      ],
      questionData: [
        {
          id: 159,
          qno: null,
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
      rq:[[]],
      sectionItems: ["A"],
      alphabeticSectionItems: ["A","B","C","D","E","","F","G","H","I","J"],
      romanSectionItems: ["I","II","III" ,"IV","V","VI","VII","VIII","IX","X"],
      numericSectionItems: ["1","2","3","4","5","6","7","8","9","10"],
      sectionData:
        {
          num: 1,
          style: 'A'
        }
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
            var count =1
            for (const iterator of res.data) {
              iterator.id=count
              count++
            }
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
          value.choice !='OR' ? this.qno++ : '';

            var len= this.selected.length;
            for (let index = 0; index < len; index++) {
            var arr = [{'qno':''},{'sqno':''},{'question':''},{'choice':''},{'difficultyLevel':''},{'maxMarks':''},{'section':''},{'CO':''}];
              if (index==0) {
                arr.qno = 'Q'+this.qno+'.';
              }
              if (len>1) {
                if (value.subQnStyle=='a') {
                  arr.sqno= String.fromCharCode(this.sqno) 
                } else {
                  arr.sqno = this.romanize(this.sqno-96).toLocaleLowerCase()
                }
                this.sqno++
                arr.sqno += ').'
              }
              if (index==len-1) {
                this.sqno=97
              }
              arr.question = this.selected[index].question;
              if (index==0) {
                if (value.choice=='OR') {
                  arr.choice = value.choice
                } else if (value.choice=='Optional') {
                  this.necessaryOptionMaxMarks=(value.necessaryOption*value.maxMarks)
                  arr.choice = 'Solve any '+value.necessaryOption+' of '+ this.selected.length + ' for Max Marks : [' +this.necessaryOptionMaxMarks+']';
                }
              }
              else
              {
                this.necessaryOptionMaxMarks=''
              } 
              arr.difficultyLevel = '['+value.difficultyLevel+']';
              arr.maxMarks = '['+value.maxMarks+']';
              arr.section = value.section;
              arr.CO = value.CO;
              this.reflectedQuestions.push(arr);
            }
          this.selected=[]
          this.topRightSnackbar=true,
          this.snackColor='success',
          this.snackText='Question added successfully!',
          this.snack=true
        },
    romanize(num) {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
          while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
          }
        }
        return roman;
      },
    closeDialog (value) {
      this.snack=value.snack
      this.snackText=value.snackText
      this.snackColor=value.snackColor
      },
    setSectionData () {
      this.$validator.validateAll()
      this.reflectedQuestions=[]
      if(this.sectionData.style=='A'){
        this.alphabeticSectionItems.length = this.sectionData.num
        this.sectionItems = this.alphabeticSectionItems
      }
      else if(this.sectionData.style=="1"){
        this.numericSectionItems.length = this.sectionData.num
        this.sectionItems = this.numericSectionItems
      }
      else{
        this.romanSectionItems.length = this.sectionData.num
        this.sectionItems = this.romanSectionItems
      }
    },

    },
    mounted() {
      this.getQuestions();
      this.rq[0].push({
        question:'0',
        choice:'0',
        difficultyLevel:'0',
        section:'0',
        maxMarks:'0',
        CO:'0',
      })
<<<<<<< Updated upstream
      // console.log(this.rq)
=======
    },
    watch: {

>>>>>>> Stashed changes
    },

  }
</script>
