<template>
  <div>
     <div class="addStore">
        <h1> Category </h1>
         <div class="top"><addCategory/> </div>
     </div>     
     <editCategory :dialog ="editDialog"  @updateEditeDialog ="updateEditeDialog" :items="editItems" />
     <deleteCategory :dialog ="deleteDialog" @updateDeleteDialog ="updateDeleteDialog" :items="deleteItem" />

    <el-table :data="nameStore" style="width: 100% ;" max-height="570" :header-cell-style="{ background: '#F2F2F2' }">
    <!-- <data-tables :data="nameStore" :total ="10"  > -->

        <div slot="empty" style="color: red">Users is empty</div>
        <el-table-column fixed type="index" :index="indexMethod" label="ID" width="250" sortable > </el-table-column>
        <el-table-column prop="name" label="Name" width="250" sortable> </el-table-column>
        <el-table-column  prop="storeName"   width="250" label="Store ID"  sortable ></el-table-column>
    
        <el-table-column fixed="right" label=" Edit  |  Delete">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="editCategory(scope.row)" style="margin-right: 15px" icon="el-icon-edit"></el-button>
            <el-button type="text" size="small" @click="deletecategoey(scope.row)" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      <!-- </data-tables> -->
      </el-table>

  </div>
</template>

<script>
import axios from "axios";
import addCategory from '../components/category/addCategory.vue'
import editCategory from '../components/category/editCategory.vue'
import deleteCategory from '../components/category/deleteCategory.vue'
export default {
    components:{
      addCategory,
      editCategory,
      deleteCategory
},
  data(){
    return {
      nameStore : [],
      category:[],
      mergeTable:[],
      store:[],
      items:[],
      editItems:'',
      deleteItem:'',
      editDialog:false,
      deleteDialog:false,
      tableCategory:[]
    }
  },
  async created() {
    const res = await axios.get('http://localhost:3000/categories')
    this.category = res.data
    const resstore = await axios.get('http://localhost:3000/stores')
    this.store = resstore.data
    this.mergeCatStore()
  
  },
  methods:{
    indexMethod(index) {
      return "00".concat(index+1);  
    },
    mergeCatStore(){
      let newTable = this.store.map(function (row){
          return { storeId : row.id, storeName : row.name }
      })

      this.nameStore =this.category.map(itm => ({
          ...newTable.find((item) => (item.storeId === itm.storeId) && item),
          ...itm
      }));
    },

    editCategory(row){
      // console.log(row)
      this.editDialog = true
      this.editItems = row.id
    }
    ,
    deletecategoey(row){
      this.deleteDialog = true
      this.deleteItem = row.id
    },
    updateEditeDialog(val){
      this.editDialog = val
    },
    updateDeleteDialog(val){
  
      this.deleteDialog = val
    }
  }
}
</script>

<style scobe>

.addStore{
  /* margin-bottom: 30px; */
  display: flex;
  justify-content:space-between;
}
.heard-titel{
  display: flex;
}
.h1{
  font-size: 24px;
}
.top{
  margin-top: 25px;
}
</style>