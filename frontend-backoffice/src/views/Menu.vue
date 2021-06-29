<template>
  <div>
    <div class="addStore">
        <h1> Menu </h1>
        <div class="top"><addMenu /> </div>
     </div> 
    <editMenu :dialog ="editDialog"  @updateEditeDialog ="updateEditeDialog" :items="editItems" />
    <deleteMenu :dialog ="deleteDialog" :DelID ="items" @updateDeleteDialog ="updateDeleteDialog" />

    <el-table :data="data"  :key="data" style="width: 100% ;" max-height="570" :header-cell-style="{ background: '#F2F2F2' }">
      <div slot="empty" style="color: red">Menu is empty</div>

      <el-table-column
        fixed
        type="index"
        :index="indexMethod"
        label="ID"
        width="150"
        sortable
      >
      </el-table-column>

      <el-table-column prop="name" label="Name" width="250" sortable>
      </el-table-column>
      <el-table-column prop="type" label="Category" width="250" sortable>
      </el-table-column>
      <el-table-column prop="from" label="From" width="250" sortable>
      </el-table-column>
      <el-table-column prop="price" label="Price" width="250" sortable> </el-table-column>

      <el-table-column fixed="right" label="Action" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editMenu(scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteMenu(scope.row)"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import addMenu from "../components/menu/addMenu.vue";
import editMenu from "../components/menu/editMenu.vue";
import deleteMenu from "../components/menu/deleteMenu.vue";
export default {
  components: {
    addMenu,
    editMenu,
    deleteMenu
  },

  data() {
    return {
      data: [],
      editItems: "",
      editDialog:false,
      deleteDialog:false,
      items:""
    };
  },
  async created() {
    this.setData()
  },
  methods: {
    async setData(){
      const res = await axios.get("http://localhost:3000/menus");
      // const result = {}
      var index = 0;
      for (const val of res.data) {
        const categoryname = await axios.get(
          "http://localhost:3000/categories/" + val.categoryId
        );
        const storename = await axios.get(
          "http://localhost:3000/stores/" + categoryname.data[0].storeId
        );
        // console.log(storename);
        res.data[index].type = categoryname.data[0].name;
        res.data[index].from = storename.data[0].name;
        this.data[index] = res.data[index];
        // console.log(val, index);
        index++;
    }
    this.data = res.data;
    },
    indexMethod(index) {
      return "00".concat(index + 1);
    },

    editMenu(row) {
      this.editDialog = true
      this.editItems = row
      // console.log(typeof(row.id))
    },
    deleteMenu(menu) {
      this.deleteDialog = true;
      this.items = menu;
    },
    updateEditeDialog(val) {
      this.editDialog = val;
    },
    updateDeleteDialog(val) {
      this.deleteDialog = val;
    },
  },
};
</script>

<style>
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