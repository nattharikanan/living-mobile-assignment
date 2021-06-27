<template>
   <el-dialog
  title= "Edite"
  :visible.sync="openCardDialog"
  width="30%">
  <!-- <span slot="footer" class="dialog-footer">
      <el-form :label-position="labelPosition" :model="formEditStore" :rules="rule">
  <el-form-item label="Name" prop="storeName" >
    <el-input v-model="formEditStore.name"></el-input>
  </el-form-item>
  <el-form-item label="Description">
    <el-input :label="items.description"  v-model="formEditStore.description"></el-input>
  </el-form-item>
  <el-form-item label="Rating" :label-position="labelPosition"  prop="storeRating">
    <el-select :value="items.raing"  v-model="formEditStore.rating" clearable placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select>

  </el-form-item>
</el-form>
    <el-button @click="openCardDialog= false" round>Cancel</el-button>
    <el-button type="primary" round @click="editStore()">Edit Store</el-button>
  </span> -->
</el-dialog>
  
</template>

<script>
// import axios from "axios";
export default {
   props : {
        dialog : {
            type : Boolean,
              default: false,
        },
    },
     computed: {
    openCardDialog: {
      get() {
        return this.dialog
      },
      set(val) {
            this.$emit('updateEditeDialog', val) 
      }
    }
  },

    data(){
        return {
          formEditStore:{},
          labelPosition: 'Top',
             options: [{
          value: 1}, 
          {
          value: 2
        }, {
          value: 3
        }, {
          value:4,
        }, {
          value: 5,
        }],
          rule:{
             storeName: [
               { required: true, message: 'Please input your store name.', trigger: 'blur' },
               { min: 2, max: 50, message: 'Length of 2 to 50 characters', trigger: 'blur' },
             ],
             storeRating:[
                   { required: true, message: 'Please select your store raing.', trigger: 'blur' },
             ]
      },
        }
    },
    async created() {
    this.formEditStore = this.$route.params
    console.log(this.formEditStore)
    console.log(this.$route.params)
  },
   methods: {
     editStore(){
     
     }
   
   }
}
</script>

<style>

</style>