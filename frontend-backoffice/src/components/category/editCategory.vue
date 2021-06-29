<template>
    <el-dialog
        title= "Edit Category"
        :visible.sync="openCardDialog"
        width="40%">
        <hr>
    <span slot="footer" class="dialog-footer">
    <el-form :label-position="labelPosition" :model="formEditCategory[0]" >
        <el-form-item label="Name" prop="Name" >
            <el-input v-model="formEditCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="Store ID" :label-position="labelPosition"  prop="storeId"><br>
            <el-select v-model="formEditCategory.storeId" clearable placeholder="Select"  class="option">
                <el-option
                v-for="item in store"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <el-button @click="openCardDialog= false" round>Cancel</el-button>
    <el-button type="primary" round @click="editCategory()">Edit</el-button>
  </span>
</el-dialog>
  
</template>

<script>
import axios from "axios";
export default {
   props : {
        dialog : {
            type : Boolean,
              default: false,
        },
        items :{
          type : String
        }
    },
    computed: {
        openCardDialog: {
            get() {
                this.setData()
                this.getStore()
                return this.dialog
            },
            set(val) {
                this.$emit('updateEditeDialog', val) 
            }
        }
    },
    data(){
        return {
            id:'',
            formEditCategory:[],
            labelPosition: 'Top',
            store:[],
            rule:{
                Name: [
                { min: 2, max: 50, message: 'Length of 2 to 50 characters', trigger: 'blur' },
                ],
                storeId:[
                    { required: true, message: 'Please select your store.', trigger: 'blur' },
                ]
            },
        }
    },
    async created() {
        
    },   
    methods: {
        async setData(){
            if(this.dialog){
                this.id = this.items
                const res = await axios.get(`http://localhost:3000/categories/${this.id}`)
                this.formEditCategory = res.data[0]
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
            message: 'แก้ไขข้อมูลประเภทสำเร็จ',
            offset: 80
            }); 
    },
    
        async editCategory(){
            if(this.formEditCategory.name === '' || this.formEditCategory.storeId ===''){
                this.$notify.warning({
                title: 'ไม่สำเร็จ',
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                offset: 80
                });
            }else{
                const res = await axios.put(`http://localhost:3000/categories/${this.id}`,{
                    name : this.formEditCategory.name,
                    storeId : this.formEditCategory.storeId,
                })
                console.log(res.status);
                if (!res.status == 200) {
                    console.log("แก้ไขข้อมูลประเภทไม่สำเร็จ");

                } else {
                    this.open();
                    console.log("แก้ไขข้อมูลประเภทสำเร็จ");
                }
                this.openCardDialog= false
                this.reload()
            }
        },

        async getStore()  {
            if(this.dialog){
                const res = await axios.get(`http://localhost:3000/stores`)
                this.store = res.data
            }
        },
   }
}
</script>

<style>

</style>