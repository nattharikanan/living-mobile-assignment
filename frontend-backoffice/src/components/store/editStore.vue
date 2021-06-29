<template>
<div>
   <el-dialog
   class="editDialog"
  title= "Edite Store"
  :visible.sync="openCardDialog"
  width="40%" >
     <hr/>
      <el-form :label-position="labelPosition" :model="formEditStore[0]" :rules="rules" >
  <el-form-item label="Store Name" prop="name" >
    <el-input v-model="formEditStore.name"></el-input>
  </el-form-item>
  <el-form-item label="Description"  prop="description">
    <el-input  v-model="formEditStore.description"></el-input>
  </el-form-item>
  <el-form-item label="Rating" :label-position="labelPosition"  prop="storeRating">
    <br>
    <el-select  v-model="formEditStore.rating" clearable placeholder="Select" class="option">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select>
  <br>
  </el-form-item>
  <div class="set-button">
    <el-button @click="openCardDialog= false" round>Cancel</el-button>
    <el-button type="primary" round @click="editStore">Edit Store</el-button>
</div>
</el-form>
</el-dialog>

  </div>
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
        return this.dialog
      },
      set(val) {
            this.$emit('updateEditeDialog', val) 
      }
    }
  },

    data(){
        return {
          alert:false,
          id:'',
          formEditStore:[],
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
           rule :{
             name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
             description : [{ required: true, message: 'Please input name', trigger: 'blur' }],
             storeRating:[{ required: true, message: 'Please select your store raing.', trigger: 'blur' }]
             },
        }
    },
    async created() {
        
  },
   methods: {
    async setData(){
       if(this.dialog){
            this.id = this.items
            const res = await axios.get(`http://localhost:3000/stores/${this.id}`)
            this.formEditStore = res.data[0]
       }
     },
    async editStore(){
      console.log(typeof (this.formEditStore.name))
        if(this.formEditStore.name === '' || this.formEditStore.description === '' || this.formEditStore.rating === '' ){
          this.$notify.warning({
          title: 'ไม่สำเร็จ',
          message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          offset: 80
        })
       }
       else
       {
         const res = await axios.put(`http://localhost:3000/stores/${this.id}`,{
            name : this.formEditStore.name,
            description: this.formEditStore.description,
            rating: this.formEditStore.rating
          })
              if (!res.status == 200) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");

      } else {
        this.open();
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
       }
       this.openCardDialog= false
       }
   },
       open() {
        this.$notify.success({
          title: 'สำเร็จ',
          message: 'แก้ไขข้อมูลสำเร็จ',
          offset: 80
        });
           setTimeout(function(){
        location.reload(); 
          },1000);
       
      }
   }
}
</script>
<style>
.editDialog .set-button {
  display: flex;
  justify-content: flex-end;
}
</style>