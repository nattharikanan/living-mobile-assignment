<template>
  <div>
    <div class="addStore"> 
      <h1 class="store-text">Store</h1>
       <addStore class="add"/>
    </div>
    
     <editStore :dialog ="editDialog"  @updateEditeDialog ="updateEditeDialog" :items="editItems" />
     <deleteStore :dialog ="deleteDialog" @updateDeleteDialog ="updateDeleteDialog" :items="items" />
     <div class="container">

          <el-table :data="data" :total="10" :header-cell-style="{ background: '#F2F2F2' }" max-height="570"  >
        <div slot="empty" style="color: red">Users is empty</div>
        <el-table-column  type="index" :index="indexMethod" label="ID" sortable width="300" >
        </el-table-column>
        <el-table-column prop="name" label="Name" sortable>
        </el-table-column>
        <el-table-column prop="description" label="Description" sortable>
        </el-table-column>
          <el-table-column prop="rating" label="Rating" sortable>
        </el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="editStore(scope.row)" icon="el-icon-edit"></el-button>
            <el-button type="text" size="small" @click="deleteStore(scope.row)" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table >
     </div>
 

  </div>
</template>

<script>
import axios from "axios";
import addStore from '../components/store/addStore.vue'
import editStore from '../components/store/editStore.vue'
import deleteStore from '../components/store/deleteStore.vue'
export default {
    components:{
      addStore,
      editStore,
      deleteStore
},
  data(){
    return {
      data:[],
      items:'',
      editItems:'',
      editDialog:false,
      deleteDialog:false
    }
  },
  async created() {
    const res = await axios.get('http://localhost:3000/stores')
    this.data = res.data
    
  },
  methods:{
       indexMethod(index) {
        return "00".concat(index+1);  
    },
    editStore(row){
      this.editDialog = true
      this.editItems = row.id
    }
    ,
    deleteStore(row){
          this.deleteDialog = true
          this.items = row.id
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

<style scoped>
.addStore{
  display: flex;
  justify-content:space-between;
 
}
.add{
margin-top: 20px;
}

</style>