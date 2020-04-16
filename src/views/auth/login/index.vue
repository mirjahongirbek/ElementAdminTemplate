<template>
<div class="login_content">
    <div class="header">
      <h2 class="logo">
        <img src="https://igenius.uz/uploads/gi/6e4f963a2107b1d185fb8092b6c6381e.png"/>
      </h2>
    </div>
      <div class="login">
        <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Login</el-button>
        </el-form-item>
        <a class="forgot-password" >Forgot password ?</a>
      </el-form>
    </el-card>
  </div>
</div>

</template>

<script>
export default {
  name: "login",
  data() {
    return {
      validCredentials: {
        username: "lightscope",
        password: "lightscope"
      },
      model: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
       resolve({token:"example"})
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
   let result=   await this.simulateLogin();
   console.log(result);
      this.loading = false;
      if (
        this.model.username === this.validCredentials.username &&
        this.model.password === this.validCredentials.password
      ) {
        this.$message.success("Login successfull");
      } else {
        this.$message.error("Username or password is invalid");
      }
    }
  }
};
</script>
<style lang="scss">
@import url("../style.scss");
</style>
