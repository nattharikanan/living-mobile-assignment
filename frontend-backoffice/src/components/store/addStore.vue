<template>
<div>
   <el-button type="primary" @click="dialogVisible = true" round>+ Add new Store</el-button>
   <el-dialog
   class="addStore"
   title="Add Store"
  :visible.sync="dialogVisible"
    width="40%">
    <hr/>
      <el-form :label-position="labelPosition" :model="formAddStore" :rules="rule">
  <el-form-item label="Store Name" prop="name" >
    <el-input v-model="formAddStore.name"></el-input>
  </el-form-item>
  <el-form-item label="Description" prop="description">
    <el-input v-model="formAddStore.description"></el-input>
  </el-form-item>
  <el-form-item label="Rating" :label-position="labelPosition"  prop="storeRating">
    <br>
    <el-select v-model="formAddStore.rating" clearable placeholder="Select" class="option">
    <el-option
    
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <br>
  <br>
</el-form>
<div class="set-button">
    <el-button @click="dialogVisible = false" round>Cancel</el-button>
    <el-button type="primary" @click="addStore()" round>Add Store</el-button>
</div>

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
             name: [
                { required: true, message: 'Please input Store name', trigger: 'blur' }
             ],
             description : [{ required: true, message: 'Please input Store description', trigger: 'blur' }],
             storeRating:[
                   { required: true, message: 'Please select your Store raing.', trigger: 'blur' },
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
       if(this.formAddStore.name === '' || this.formAddStore.description ==='', this.formAddStore.rating === '' ){
          this.$notify.warning({
          title: 'ไม่สำเร็จ',
          message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          offset: 80
        });
       }else{
         this.dialogVisible = false
          console.log(this.formAddStore)
          const res = await axios.post('http://localhost:3000/stores',{
              name : this.formAddStore.name,
              description : this.formAddStore.description,
              rating : this.formAddStore.rating
          })
            if (!res.status == 201) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");

      } else {
        this.open();
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
       }
       this.dialogVisible= false
      }

       },
         open() {
        this.$notify.success({
          title: 'สำเร็จ',
          message: 'เพิ่มข้อมูลร้านค้าสำเร็จ',
          offset: 80
        });
      }
  }
}
</script>

<style >


</style>