<template>
  <div class="cont">
    <div class="demo">
      <div class="login">
        <!-- <div class="login__check"></div> -->
        <div class="login__form" style="top:10%">
          <div class="login__row">
            <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
              <path
                d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"
              />
            </svg>
            <imask-input
              :mask="$store.state.masks.phone"
              radix="."
              placeholder="номер телефона "
              class="login__input name white_place"
              v-model="loginForm.login"
              :unmask="true"
              id="input05"
            />
          </div>
          <div class="login__row">
            <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
              <path
                d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"
              />
            </svg>
            <input
              class="login__input name white_place"
              placeholder="Имя"
              v-model="loginForm.firstName"
            />
          </div>
          <div class="login__row">
            <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
              <path
                d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"
              />
            </svg>
            <input
              class="login__input name white_place"
              v-model="loginForm.middleName"
              placeholder="Отчество"
            />
          </div>
          <div class="login__row">
            <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
              <path
                d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"
              />
            </svg>
            <input
              class="login__input name white_place"
              v-model="loginForm.lastName"
              placeholder="Фамилия"
            />
          </div>
          <div class="login__row">
            <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
              <path
                d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"
              />
            </svg>
            <input
              type="password"
              class="login__input pass white_place"
              v-model="loginForm.password"
              placeholder="Пароль"
            />
          </div>
          <div class="login__row">
            <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
              <path
                d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"
              />
            </svg>
            <input
              type="password"
              class="login__input pass white_place"
              v-model="loginForm.confirmPassword"
              placeholder="Подтвердите пароль"
            />
          </div>
          <button type="button" class="login__submit" @click="registerClient()">
            Регистрация
          </button>
          <p class="login__signup">
            <router-link to="/login">войти </router-link>
          </p>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="activateModal" custom-class="dialog_cass">
      <span>
        <el-form>
          <el-form-item label="Код подтверждения">
            <el-input v-model="activateMe.otp"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="goActivate()">Отправить</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activateModal: false,
      activateMe: {
        otp: "",
        phoneNumber: ""
      },
      loginForm: {
        login: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    goActivate() {
      this.$api
        .put(
          "/api-buyer/Cabinet/ClientActive?phoneNumber=" +
            this.activateMe.phoneNumber +
            "&otp=" +
            this.activateMe.otp
        )
        .then(
          response => {
            this.activateModal = false;
            this.$router.push({ path: "/login" });
          },
          err => this.$store.getters.errorParse(err, this)
        );
    },
    registerClient() {
      if (
        this.loginForm.password != this.loginForm.confirmPassword ||
        !this.loginForm.password
      ) {
        this.$store.getters.notify(this, "error", "", "пароль не совпадает ");
        return;
      }
      let item = JSON.parse(JSON.stringify(this.loginForm));
      item.login = "998" + item.login;
      this.$api.post("/api-buyer/Cabinet/ClientReg", item).then(
        resposne => {
          this.activateModal = true;
          this.activateMe.phoneNumber = item.login;
          // this.$router.push({ path: "/login" });
          // this.$store.getters.notify(
          //   this,
          //   "Success",
          //   "регистрация",
          //   "прошла успешна "
          // );
        },
        err => this.$store.getters.errorParse(err, this)
      );
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("../style.css");
</style>
