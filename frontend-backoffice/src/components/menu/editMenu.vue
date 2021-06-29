<template>
  <el-dialog title="Edit Menu" :visible.sync="openCardDialog" width="30%">
    <hr>
    Editing <br /><br />{{ items.name }}
      <el-form :label-position="labelPosition" :model="formEditMenu[0]">
        <el-form-item label="Menu Name" prop="menuName">
          <el-input v-model="formEditMenu.name"></el-input>
        </el-form-item>
        <el-form-item label="Price" prop="menuPrice" >
          <el-input
            :label="items.description"
            v-model="formEditMenu.price"
          ></el-input>
        </el-form-item>
        <el-form-item label="Select Category" :label-position="labelPosition"  prop="categorySelect"><br>
            <el-select v-model="formEditMenu.categoryId" clearable placeholder="Select" class="option">
                <el-option
                v-for="item in categorylist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div class="set-button">
      <el-button @click="openCardDialog = false" round>Cancel</el-button>
      <el-button type="primary" round @click="editStore()">Edit Store</el-button>
      </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
    },
  },
  computed: {
    openCardDialog: {
      get() {
        this.setData();
        this.setMenu();
        return this.dialog;
      },
      set(val) {
        this.$emit("updateEditeDialog", val);
      },
    },
  },

  data() {
    return {
      id: "",
      formEditMenu: {},
      labelPosition: "Top",
      
      rule: {
        storeName: [
          {
            required: true,
            message: "Please input your menu name.",
            trigger: "blur",
          },
          {
            min: 2,
            max: 50,
            message: "Length of 2 to 50 characters",
            trigger: "blur",
            required: true
          },
        ],
        storeRating: [
          {
            required: true,
            message: "Please select category.",
            trigger: "blur",
          },
        ],
      },
      categorylist:[],
    };
  },
  async created() {

    
  },
  methods: {
    async setData() {
      // if (this.dialog) {
      //   this.id = this.items;
      //   const res = await axios.get(`http://localhost:3000/stores/${this.id}`);
      //   this.formEditMenu = res.data[0];
      // }
    },
    async editStore() {
      if(this.formEditMenu.name === '' || this.formEditMenu.price ===''|| this.formEditMenu.categoryId ===''){
                this.$notify.warning({
                title: 'ไม่สำเร็จ',
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                offset: 80
                });
            }else{
                const res = await axios.put(`http://localhost:3000/menus/${this.items.id}`, {
                  name: this.formEditMenu.name,
                  price: this.formEditMenu.price,
                  categoryId: this.formEditMenu.categoryId,
                })
                console.log(res.status);
                if (!res.status == 200) {
                    console.log("แก้ไขข้อมูลประเภทไม่สำเร็จ");
                } else {
                    this.open();
                    console.log("แก้ไขข้อมูลประเภทสำเร็จ");
                }
                this.openCardDialog= false
                this.reload()
            }
    },

    async getcategorylist(id){
      // console.log(id)
      const res = await axios.get("http://localhost:3000/categories/findbystoreid/" + id);
      this.categorylist = res.data
      // console.log(this.categorylist)
    },
    async setMenu(){
      const res = await axios.get("http://localhost:3000/menus/" + this.items.id);
      console.log(res)
      this.formEditMenu = res.data[0]
      // this.formEditMenu.name = res.data[0].name
      // this.formEditMenu.price = res.data[0].price
      // this.formEditMenu.category = res.data[0].categoryId
      const result = await axios.get("http://localhost:3000/categories/" + this.items.categoryId);
      const result2 = await axios.get("http://localhost:3000/stores/" + result.data[0].storeId);
      this.getcategorylist(result2.data[0].id)
      
    },
    reload(){
            setTimeout(function(){
                location.reload(); 
            },2000);
        },
    async open() {
            this.$notify.success({
            title: 'สำเร็จ',
            message: 'แก้ไขข้อมูลเมนูสำเร็จ',
            offset: 80
            }); 
        },
  },
  
};
</script>

<style>
</style>