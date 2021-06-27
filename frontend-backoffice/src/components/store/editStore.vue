<template>
   <el-dialog
  :title= "formEditStore.name"
  :visible.sync="openCardDialog"
  width="30%">
  <span slot="footer" class="dialog-footer">
      <el-form :label-position="labelPosition" :model="formEditStore[0]" >
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
         
      // const res = await axios.get(`http://localhost:3000/stores/${this.$route.params.id}`)
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
          const res = await axios.put(`http://localhost:3000/stores/${this.id}`,{
            name : this.formEditStore.name,
            description: this.formEditStore.description,
            rating: this.formEditStore.rating
          })
          console.log(res.status);
              if (!res.status == 200) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");

      } else {
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
       }
       this.openCardDialog= false
   
   }
   }
}
</script>

<style>

</style>