<template>
    <el-dialog
        :title= "formEditCategory.name"
        :visible.sync="openCardDialog"
        width="30%">
    <span slot="footer" class="dialog-footer">
    <el-form :label-position="labelPosition" :model="formEditCategory[0]" >
        <el-form-item label="Name" prop="Name" >
            <el-input v-model="formEditCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="Store ID" :label-position="labelPosition"  prop="storeId">
            <el-select v-model="formEditCategory.storeId" clearable placeholder="Select">
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
                { required: true, message: 'Please input your category name.', trigger: 'blur' },
                { min: 2, max: 50, message: 'Length of 2 to 50 characters', trigger: 'blur' },
                ],
                storeId:[
                    { required: true, message: 'Please select your store raing.', trigger: 'blur' },
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

        async editCategory(){
            const res = await axios.put(`http://localhost:3000/categories/${this.id}`,{
                name : this.formEditCategory.name,
                storeId : this.formEditCategory.storeId,
            })
            console.log(res.status);
            if (!res.status == 200) {
                console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");

            } else {
                console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
            }
            this.openCardDialog= false
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