<template>
   <el-dialog
        title=“ลบร้านค้า”
        :visible.sync="openCardDialog"
        width=“30%“>
        <div class="message">
          คุณต้องการลบ <strong>{{deleteItems.name}}</strong> ใช่หรือไม่ ?
        </div>
        <br><br>
    <div class="set-button">
        <el-button type="danger" round @click="deleteCategory()">Delete</el-button>
        <el-button @click="openCardDialog= false" round>Cancel</el-button>
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
                const res = await axios.get(`http://localhost:3000/categories/${this.items}`)
                this.deleteItems = res.data[0]
        }
        },
        async deleteCategory(){
            const res = await axios.delete(`http://localhost:3000/categories/${this.items}`)          
            console.log(res.status)
            if (!res.status == 200) {
                console.log("ลบสินค้าไม่สำเร็จ");
            } else {
                this.open();
                console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
            }
            this.reload()
            this.openCardDialog= false
        },
        open() {
            this.$notify.success({
                title: 'สำเร็จ',
                message: 'ลบข้อมูลสำเร็จ',
                offset: 80
            });
        },
        reload(){
            setTimeout(function(){
                location.reload(); 
            },2000);
        },
    }
}
</script>
<style>

</style>
















