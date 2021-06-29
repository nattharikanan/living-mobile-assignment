<template>
   <el-dialog title="Do you want to delete this ?" :visible.sync="openCardDialog" width="30%">
     <div class="message">
     {{DelID.name}}
     </div>
     <br><br>
  <div class="set-button">
    <el-button @click="openCardDialog= false" round>Cancel</el-button>
    <el-button type="danger" @click="deleteID(DelID)" round>Delete Menu</el-button>
  </div>
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
        DelID : {
            type : Object
        }
    },
     computed: {
    openCardDialog: {
      get() {
        return this.dialog
      },
      set(val) {
            this.$emit('updateDeleteDialog', val) 
      }
    }
  },
    data(){
        return {
          action : false,
          
        }
    },
   methods: {
     async deleteID(id){
       const res = await axios.delete("http://localhost:3000/menus/"+id.id);

       if (!res.status == 200) {
            this.$notify.warning({
                    title: 'ไม่สำเร็จ',
                    message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    offset: 80
                    });
                console.log("ลบสินค้าไม่สำเร็จ");
            } else {
                this.open();
                console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
            }
            this.reload()
            this.openCardDialog= false
        },
        reload(){
            setTimeout(function(){
                location.reload(); 
            },1000);
        },
      open() {
            this.$notify.success({
                title: 'สำเร็จ',
                message: 'ลบข้อมูลสำเร็จ',
                offset: 80
            });
        },
   }
}
</script>

<style>

</style>