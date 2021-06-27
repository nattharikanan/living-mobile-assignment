<template>
   <el-dialog
  title="Do you want to delete this Store ?"
  :visible.sync="openCardDialog"
  width="30%">
  <span slot="footer" class="dialog-footer">
      <!-- <el-form :label-position="labelPosition" :model="formAddStore" :rules="rule">
  <el-form-item label="Name" prop="storeName" >
    <el-input v-model="formEditStore.name"></el-input>
  </el-form-item>
  <el-form-item label="Description">
    <el-input v-model="formEditStore.description"></el-input>
  </el-form-item>
  <el-form-item label="Rating" :label-position="labelPosition"  prop="storeRating">
    <el-select v-model="formEditStore.rating" clearable placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select>

  </el-form-item>
</el-form> -->
    <el-button @click="openCardDialog= false" round>Cancel</el-button>
    <el-button type="primary" round>Delete Store</el-button>
  </span>
</el-dialog>
  
</template>

<script>
// import axios from "axios";
export default {
   props : {
        dialog : {
            type : Boolean,
              default: false,
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
          action : false
        }
    },
   methods: {
   
   }
}
</script>

<style>

</style>