<template>
<div>
   <el-button type="primary" @click="dialogVisible = true" round>+ Add new Store</el-button>
   <el-dialog
  title="Add Store"
  :visible.sync="dialogVisible"
  width="30%">

  <span slot="footer" class="dialog-footer">
      <el-form :label-position="labelPosition" :model="formAddStore" :rules="rule">
  <el-form-item label="Name" prop="storeName" >
    <el-input v-model="formAddStore.name"></el-input>
  </el-form-item>
  <el-form-item label="Description">
    <el-input v-model="formAddStore.description"></el-input>
  </el-form-item>
  <el-form-item label="Rating" :label-position="labelPosition"  prop="storeRating">
    <el-select v-model="formAddStore.rating" clearable placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select>

  </el-form-item>
</el-form>
    <el-button @click="dialogVisible = false" round>Cancel</el-button>
    <el-button type="primary" @click="addStore()" round>Add Store</el-button>
  </span>
</el-dialog>
      
</div>
 
</template>

<script>
import axios from "axios";
export default {
   data(){
    return {
      dialogVisible:false,
       labelPosition: 'Top',
      formAddStore:{
          name:'',
          description:'',
          rating:''
      },
      rule:{
             storeName: [
               { required: true, message: 'Please input your store name.', trigger: 'blur' },
               { min: 2, max: 50, message: 'Length of 2 to 50 characters', trigger: 'blur' },
             ],
             storeRating:[
                   { required: true, message: 'Please select your store raing.', trigger: 'blur' },
             ]
      },
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
      }
  },
  methods:{
     async addStore(){
          this.dialogVisible = false
          console.log(this.formAddStore)
          const res = await axios.post('http://localhost:3000/stores',{
              name : this.formAddStore.name,
              description : this.formAddStore.description,
              rating : this.formAddStore.rating
          })
          console.log(res.status)
      }
      
  }
}
</script>

<style>

</style>