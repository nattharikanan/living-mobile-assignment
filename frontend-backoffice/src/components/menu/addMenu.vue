<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" round
      >+ Add new Menu</el-button
    >
    <!-- ปุ่ม add menu -->
    <el-dialog title="Add Menu" :visible.sync="dialogVisible" width="30%">
      <!-- Panel form -->

      <span slot="footer" class="dialog-footer">
        <!-- ปุ่ม cancel add -->

        <el-form :label-position="labelPosition" :rules="rule">
          <!-- เริ่ม form -->

          <!-- กรอกชื่อเมนู -->

          <el-form-item label="Menu Name" prop="menuName">
            <el-input v-model="formAddMenu.name"></el-input>
          </el-form-item>

          <!-- กรอกราคา -->

          <el-form-item label="Price" prop="menuPrice">
            <el-input v-model="formAddMenu.price"></el-input>
          </el-form-item>

          <!-- เลือกร้านที่จะ add menu -->

          <el-form-item
            label="Select Store"
            :label-position="labelPosition"
            prop="storeSelect" 
          ><br>
            <el-select
              v-model="formAddMenu.store"
              clearable
              placeholder="Select"
              @change="storeChange()"
              class="option"
            >
              <el-option
                v-for="item in storeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- เลือกหมวดหมู่ของเมนู -->

          <el-form-item
            label="Select Category"
            :label-position="labelPosition"
            prop="categorySelect"
          ><br>
            <el-select
              v-model="formAddMenu.category"
              clearable
              placeholder="Select"
              :disabled="disbtn"
              class="option"
            >
              <el-option
                v-for="item in categoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- จบฟอร์ม -->
  <div class="set-button">
        <el-button @click="dialogVisible = false" round>Cancel</el-button>
        <!-- ปุ่มยกเลิก -->
        <el-button type="primary" @click="addMenu()" round>Add Menu</el-button>
        <!-- ปุ่มยืนยัน -->
  </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addMenu",
  async created() {
    this.getStore();
  },
  data() {
    return {
      dialogVisible: false,
      labelPosition: "Top",
      formAddMenu: {
        name:"",
        price:"",
        category:""
      },
      rule: {
        // menuName: [
        //   {
        //     required: true,
        //     message: "Please input your menu name.",
        //     trigger: "blur",
        //   },
        //   {
        //     min: 2,
        //     max: 50,
        //     message: "Length of 2 to 50 characters",
        //     trigger: "blur",
        //   },
        // ],
        // storeSelect: [
        //   { required: true, message: "Please select store.", trigger: "blur" },
        // ],
        // menuPrice: [
        //   { required: true, message: "Please input price", trigger: "blur" },
        // ],
        // categorySelect: [
        //   {
        //     required: true,
        //     message: "Please select category.",
        //     trigger: "blur",
        //   },
        // ],
      },

      storeOptions: [],
      categoryOptions: [],
      disbtn: true,
    };
  },
  methods: {
    async addMenu() {
       console.log('hihi')
      // this.dialogVisible = false;
      // // console.log(this.formAddMenu)
      // const res = await axios.post("http://localhost:3000/menus", {
      //   categoryId: this.formAddMenu.category,
      //   name: this.formAddMenu.name,
      //   price: this.formAddMenu.price,
      // });
      // console.log(res.status);
       if(this.formAddMenu.name === '' || this.formAddMenu.price ===''|| this.formAddMenu.category ===''){
                this.$notify.warning({
                title: 'ไม่สำเร็จ',
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                offset: 80
                });
                console.log('hi')
            }else{
              console.log(this.formAddMenu)
                this.dialogVisible = false
                console.log(this.formAddStore)
                const res = await axios.post("http://localhost:3000/menus", {
                  categoryId: this.formAddMenu.category,
                  name: this.formAddMenu.name,
                  price: this.formAddMenu.price,
                });
                if (!res.status == 201) {
                console.log("แก้ไขข้อมูลเมนูไม่สำเร็จ");
                }else {
                    this.open();
                    console.log("แก้ไขข้อมูลเมนูสำเร็จ");
                   
                }
                this.reload()
                this.dialogVisible= false
            }
    },
    reload(){
        setTimeout(function(){
            location.reload(); 
        },2000);
    },
    open() {
        this.$notify.success({
          title: 'สำเร็จ',
          message: 'เพิ่มข้อมูลเมนูสำเร็จ',
          offset: 80
        }); 
    },
    async getStore() {
      const res = await axios.get("http://localhost:3000/stores");
      this.storeOptions = res.data;
      // console.log(this.storeOptions)
    },
    async storeChange() {
      const res = await axios.get(
        "http://localhost:3000/categories/findbystoreid/" +
          this.formAddMenu.store
      );
      this.categoryOptions = res.data;
      // console.log(this.categoryOptions)
      this.disbtn = false;
      // this.formAddMenu.store
    },
  },
};
</script>

<style>
</style>