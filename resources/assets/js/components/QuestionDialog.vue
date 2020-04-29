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

                <v-flex xs12 sm4>
                  <v-select
                    :items="necessityItems"
                    label="Choice*"
                    v-model="choice"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-autocomplete
                    :items="['remember', 'understand', 'apply', 'create']"
                    v-model="difficultyLevel"
                    label="Diffuculty Level*"
                    required
                  ></v-autocomplete>
                </v-flex>
                <!-- <v-flex xs12 sm4 > -->
                <v-flex xs12 sm4 v-show="choice=='Optional'">
                  <v-text-field
                        v-model="questionSpecifications.necessaryOption"
                        label="No. of necessary options"
                        type="number"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-autocomplete
                    :items='sectionItems'
                    v-model="section"
                    label="Section*"
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm4 >
                  <v-text-field
                  v-model="maxMarks"
                  label="Max Marks*" type="number" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-select
                  :items="['CO1','CO2','CO3','CO4','CO5','CO6']"
                    v-model="CO"
                    label="CO Mapping Level"
                    multiple
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" :disabled="disableButton" flat @click="Add">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

</div>
</template>

<script>
export default {
  props: {
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
      // necessaryOption: 1,
      dialog: false,
      disableDialogButton: true,
      choice: '',
      difficultyLevel: '',
      section: '',
      favorites:[[]],
      maxMarks: '',
      CO:[''],
      necessityItems: ['Mandatory', 'OR', 'Optional'],
    questionSpecifications:[
        {'choice':''},
        {'difficultyLevel':'rember'},
        {'section':'A'},
        {'maxMarks':5},
        {'CO':'CO1'},
        {'necessaryOption': 1,}
      ],
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
    this.questionSpecifications.choice=this.choice,
    this.questionSpecifications.difficultyLevel=this.difficultyLevel,
    this.questionSpecifications.section=this.section,
    this.questionSpecifications.maxMarks=this.maxMarks;
    var element ='';
    for (let index = 1; index < this.CO.length; index++) {
      element += this.CO[index]+' ';
    }
    this.questionSpecifications.CO = element;
    this.$emit('addQuestion', this.questionSpecifications)

  }
},
computed: {
  updateNecessityItems () {
    if(this.noOfQuestions==1){
      this.necessityItems.length=1
      this.choice='Mandatory'
    }
  }
},
created () {
  this.updateNecessityItems
      if(this.noOfQuestions==1){
      this.necessityItems.length=1
      this.choice='Mandatory'
    }
},
watch: {
  maxMarks (newValue, oldValue) {
    this.disableButton=(newValue && newValue!=0)?false:true
  },
  difficultyLevel (newValue, oldValue) {
    this.disableButton=newValue?false:true
  },
  CO (newValue, oldValue) {
    this.disableButton=newValue.length!=0?false:true
    console.log( this.disableButton)
  },
  choice (newValue, oldValue) {
    this.disableButton=newValue?false:true
  },
  noOfQuestions (newValue, oldValue){
    if(this.noOfQuestions==1){
      this.necessityItems= ['Mandatory']
      this.choice='Mandatory'
    }else if(this.necessityItems= 2){
      this.necessityItems= ['Mandatory', 'OR', 'Optional']
    }
  },
      dialog (newValue, oldValue) {
        if(newValue==true && this.noOfQuestions==0){
          this.snackbar.snack=true,
          this.snackbar.snackColor='error',
          this.snackbar.snackText='You haven\'t selected any question yet!'
          this.$emit('closeDialog',this.snackbar)
          setTimeout(() => {
            
            }, 3000);
            // this.dialog=false
        }
      }
},
}
</script>
