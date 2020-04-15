<template>
  <div class="cont">
    <el-col :gutter="20">
      <el-col :span="8">.</el-col>
      <el-col :span="8">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <el-card class="box-card">
            <register-comp></register-comp>
          </el-card>
        </el-form>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-col>
  </div>
</template>

<script>
import registerComp from "./component/registerComp.vue";
export default {
  name: "Login",
  components: { registerComp },
  data() {
    return {
      formOrg: false,
      datakeys: [],
      temp: [],
      selectData: {
        id: 0,
        name: "",
        tIN: "",
        businessCategory: "",
        region: "",
        district: "",
        dSKeyNumber: "",
        dSKeySerial: "",
        phone: "",
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
        directorLastName: "",
        directorFirstName: "",
        directorMiddleName: "",
        directorPosition: "",
        directorInn: ""
      },
      tempKomp: {},
      selecerf: "",
      isChecked: false,
      loginForm: {
        username: "",
        password: "",
        phone: ""
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  methods: {
    activateComp(phoneNumber) {}
  }
};
</script>
