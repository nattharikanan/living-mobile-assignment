<template>
  <div>
    <data-tables :data="data" :total="10" @sort-change="sortChange">
        <div slot="empty" style="color: red">Users is empty</div>
        
        <el-table-column prop="name" label="Name" width="400" sortable>
        </el-table-column>
        <el-table-column prop="description" label="Description" width="400" sortable>
        </el-table-column>
          <el-table-column prop="rating" label="Rating" width="400" sortable>
        </el-table-column>
    
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">Edit</el-button>
            <el-button type="text" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </data-tables>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      data:[]
    }
  },
  async created() {
    const Test = await axios.get('http://localhost:3000/stores')
    console.log(Test.data)
    this.data = Test.data
  }

}
</script>

<style>

</style>