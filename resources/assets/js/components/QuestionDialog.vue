<template>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Set Question</v-btn>
          <!-- <v-btn color="primary" :disabled="disableDialogButton" dark v-on="on">Open Dialog</v-btn> -->
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Question Details</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <!-- <v-flex xs12 sm6 md4>
                  <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-flex> -->
                <v-flex xs12 sm6>
                  <v-select
                    :items="['Mandatory', 'OR', 'Optional']"
                    label="Choice*"
                    v-model="choice"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    :items="['low', 'medium', 'high']"
                    v-model="difficultyLevel"
                    label="Diffuculty Level*"
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-autocomplete
                    :items="['A', 'B']"
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
                  <v-autocomplete
                  :items="['CO1','CO2','CO3','CO4','CO5','CO6']"
                    v-model="CO"
                    label="CO Mapping Level"
                    multiple
                  ></v-autocomplete>
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
</template>

<script>
export default {
  props: {
    disableDialog: {
      type: Boolean,
      default:true
    },
  },
  data () {
    return {
      dialog: false,
      disableDialogButton: true,
      choice: '',
      difficultyLevel: '',
      section: '',
      maxMarks: '',
      CO:[''],
    questionSpecifications:[
        {'choice':''},
        {'difficultyLevel':''},
        {'section':''},
        {'maxMarks':''},
        {'CO':''},
        {'question':''}
      ]
    }
  },
methods: {
  Add () {
    this.dialog=false;
    this.questionSpecifications.choice=this.choice,
    this.questionSpecifications.difficultyLevel=this.difficultyLevel,
    this.questionSpecifications.section=this.section,
    this.questionSpecifications.maxMarks=this.maxMarks;
    // this.CO.forEach(element => {
    //   this.questionSpecifications.CO.push(element);
    //   // this.questionSpecifications.CO += element+" ";
    // });
    var element ='';
    for (let index = 1; index < this.CO.length; index++) {
      element += this.CO[index]+' ';
    }
    this.questionSpecifications.CO = element;
    // console.log(this.questionSpecifications)
    this.$emit('addQuestion', this.questionSpecifications)

}
},
}
</script>
