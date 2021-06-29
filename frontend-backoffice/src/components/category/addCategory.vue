<template>
<div>
   <el-button type="primary" @click="dialogVisible = true" round>+ Add new Category</el-button>
   
    <el-dialog
        title="AddCategory"
        :visible.sync="dialogVisible"
        width="30%">
        <hr>
    <span slot="footer" class="dialog-footer">
    <el-form :label-position="labelPosition" :model="formAddCategory" :rules="rule">
        <el-form-item label="Name" prop="storeName" >
            <el-input v-model="formAddCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="Store ID" prop="storeId">
            <br>
            <el-select v-model="formAddCategory.storeId" clearable placeholder="Select" class="option">
                <el-option
                v-for="item in store"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = false" round>Cancel</el-button>
    <el-button type="primary" @click="addCategory()" round>Add Store</el-button>
  </span>
</el-dialog>
      
</div>
 
</template>

<script>
import axios from "axios";
export default {
   data(){
    return {
        store : [],
        dialogVisible:false,
        labelPosition: 'Top',
        formAddCategory:{
            name:'',
            storeId:'',
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
        
      }
  },
 async created() {
    this.getStore();
  },
  methods:{
        async addCategory(){
            this.dialogVisible = false
            //   console.log(this.formAddStore)
            await axios.post('http://localhost:3000/categories',{
                name : this.formAddCategory.name,
                storeId : this.formAddCategory.storeId,
            })
            // console.log(res.status)
        },
        async getStore()  {
            const res = await axios.get('http://localhost:3000/stores')
            this.store = res.data
            // console.log(this.getstore);
        },
    }
}
</script>

<style>


</style>