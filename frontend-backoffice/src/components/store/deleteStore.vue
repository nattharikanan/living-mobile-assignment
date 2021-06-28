<template>
   <el-dialog
   class="deleteDialog"
  title="ลบร้านค้า"
  :visible.sync="openCardDialog"
  width="30%">
  คุณต้องการลบ {{deleteItems.name}} ใช่หรือไม่ ?
  <span slot="footer" class="dialog-footer">
    <el-button type="danger" round @click="deleteStore()">Delete Store</el-button>
    <el-button @click="openCardDialog= false" round>Cancel</el-button>
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
        items : {
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
            this.$emit('updateDeleteDialog', val) 
      }
    }
  },
    data(){
        return {
          deleteItems:[]
        }
    },
   methods: {
    async setData(){
       if(this.dialog){
            const res = await axios.get(`http://localhost:3000/stores/${this.items}`)
            this.deleteItems = res.data[0]
       }
      
     },
     async deleteStore(){
           const res = await axios.delete(`http://localhost:3000/stores/${this.items}`)
           console.log(res.status)
              if (!res.status == 200) {
        console.log("ลบสินค้าไม่สำเร็จ");

      } else {
        this.open();
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
       }
       this.openCardDialog= false

     },
         open() {
        this.$notify.success({
          title: 'สำเร็จ',
          message: 'ลบข้อมูลสำเร็จ',
          offset: 80
        });
      }
   
   }
}
</script>

<style scoped>
.deleteDialog{
   height: 300px;
}
</style>