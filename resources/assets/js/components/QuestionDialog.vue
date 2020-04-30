<template>
<div>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn  fab dark color="indigo" v-on="on">
            <v-icon dark>add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Question Details</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex cols="auto">
                  <v-select
                    :items="necessityItems"
                    :rules='necessityRules'
                    label="Choice*"
                    v-model="questionSpecifications.choice"
                    required
                  ></v-select>
                </v-flex>
                <v-flex cols="auto" v-show="(questionSpecifications.choice=='Optional' && noOfQuestions>1)">
                  <v-text-field
                    v-model="questionSpecifications.necessaryOption"
                    label="No. of necessary question"
                    type="number"
                    :rules="necessaryOptionRules"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex cols="auto">
                  <v-autocomplete
                    :items="['remember', 'understand', 'apply', 'create']"
                    v-model="questionSpecifications.difficultyLevel"
                    label="Diffuculty Level*"
                    required
                  ></v-autocomplete>
                </v-flex>

                <v-flex cols="auto">
                  <v-autocomplete
                    :items='sectionItems'
                    v-model="questionSpecifications.section"
                    label="Section*"
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex cols="auto" >
                  <v-text-field
                  v-model="questionSpecifications.maxMarks"
                  :rules="maxMarksRules"
                  label="Max Marks*" type="number" required></v-text-field>
                </v-flex>
                <v-flex cols="auto">
                  <v-select
                  :items="['a','i']"
                    v-model="questionSpecifications.subQnStyle"
                    label="Sub-Question Style"
                    required
                    v-show="noOfQuestions>1"
                  ></v-select>
                </v-flex>
                <v-flex cols="auto">
                  <v-select
                  :items="['CO1','CO2','CO3','CO4','CO5','CO6']"
                    v-model="CO"
                    label="CO Mapping Level"
                    multiple
                    required
                    chips
                    deletable-chips
                  >
                  </v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="Add">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

</div>
</template>

<script>
export default {
  props: {
    questionNo:{
      type: Number,
      default: 1
    },
    disableDialog: {
      type: Boolean,
      default:true
    },
    sectionItems: {
      type: Array,
      default: ["A","B","C","D","E","F","G","H","I","J"]
    },
    noOfQuestions: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      maxMarksRules: [
        v => !!v ||'Max. Marks can\'t be null',
        v => (v && v <= 100) || 'Max marks must be less than 100',
        v => (v && v > 0) || 'Max marks must be greater than 0'
      ],
      necessityRules: [
        v => (v!='Optional' || this.noOfQuestions>1)||'Only one question can\'t have options',
        v => (v!='OR' || this.questionNo>=1)||'First question can\'t have OR feature',
      ],
      necessaryOptionRules: [
        v => (!!v )||'No. of necessary question is required',
        v => (v< this.noOfQuestions) || 'No. of necessary question must be less than selected questions',
        v => (v>= 1) || 'No. of necessary question must be greater equal 1'
      ],
      dialog: false,

      favorites:[[]],
      necessityItems: ['Mandatory', 'OR', 'Optional'],
    questionSpecifications:{
        choice: 'Mandatory',
        difficultyLevel: 'remember',
        section: 'A',
        maxMarks: 5,
        subQnStyle: 'a',
        necessaryOption: 1,
        CO:''
        },
      CO:['CO1','CO2'],
      disableButton: true,
      snackbar:{
        snack: false,
        snackColor: '',
        snackText: '',
      }
    }
  },
methods: {
  Add () {
    this.dialog=false;
    var element ='';
    for (let index = 0; index < this.CO.length; index++) {
      element += '['+this.CO[index]+']'
    }
    this.questionSpecifications.CO = element;
    this.$emit('addQuestion', this.questionSpecifications)

  }
},
computed: {
  updateNecessityItems () {
    if(this.noOfQuestions==1){
      this.necessityItems.length=1
      this.questionSpecifications.choice='Mandatory'
    }
  }
},
created () {
  this.updateNecessityItems
      if(this.noOfQuestions==1){
      this.necessityItems.length=1
      this.questionSpecifications.choice='Mandatory'
    }
},
watch: {

      dialog (newValue, oldValue) {
        if(newValue==true && this.noOfQuestions==0){
          this.snackbar.snack=true,
          this.snackbar.snackColor='error',
          this.snackbar.snackText='You haven\'t selected any question yet!'
          this.$emit('closeDialog',this.snackbar)
          setTimeout(() => {
            
            this.dialog=false
            }, 1000);
        }
      },
},
}
</script>
