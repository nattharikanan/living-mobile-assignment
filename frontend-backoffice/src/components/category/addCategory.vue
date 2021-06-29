<template>
<div>
   <el-button type="primary" @click="dialogVisible = true" round>+ Add new Category</el-button>
    <el-dialog
        title="AddCategory"
        :visible.sync="dialogVisible"
        width="40%">
        <hr/>
    <el-form :label-position="labelPosition" :model="formAddCategory" :rules="rule">
        <el-form-item label="Name" prop="CategoryName" >
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
    <br><br>
    <div class="set-button">
        <el-button @click="dialogVisible = false" round>Cancel</el-button>
        <el-button type="primary" @click="addCategory()" round>Add</el-button>
    </div>
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
            CategoryName: [
                { min: 2, max: 50, message: 'Length of 2 to 50 characters', trigger: 'blur' },
            ],
            storeID:[
                    { required: true, message: 'Please select your store .', trigger: 'blur' },
            ]
        },
        
      }
  },
 async created() {
    this.getStore();
  },
  methods:{
        async addCategory(){
            if(this.formAddCategory.name === '' || this.formAddCategory.storeId ===''){
                this.$notify.warning({
                title: 'ไม่สำเร็จ',
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                offset: 80
                });
            }else{
                this.dialogVisible = false
                console.log(this.formAddStore)
                const res = await axios.post('http://localhost:3000/categories',{
                    name : this.formAddCategory.name,
                    storeId : this.formAddCategory.storeId,
                })
                if (!res.status == 201) {
                console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
                }else {
                    this.open();
                    console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
                   
                }
                this.dialogVisible= false
                this.reload()
            }
       },
    reload(){
        setTimeout(function(){
            location.reload(); 
        },2000);
    },
    open() {
        this.$notify.success({
          title: 'สำเร็จ',
          message: 'เพิ่มข้อมูลประเภทสำเร็จ',
          offset: 80
        }); 
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