<template>
  <div class="cont">
    <div class="demo">
      <div class="login">
        <div class="login__check"></div>
        <form class="login__form" v-on:submit.prevent="login()">
          <div class="login__row">
            <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
              <path
                d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"
              />
            </svg>
            <imask-input
              :mask="$store.state.masks.phone"
              radix="."
              class="login__input name"
              v-model="loginForm.login"
              :unmask="true"
              id="input05"
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
              class="login__input pass"
              v-model="loginForm.password"
              placeholder="Password"
            />
          </div>
          <br />
          <button
            type="button"
            class="login__signup"
            @click="restetPhoneModal = true"
            style="cursor:pointer"
          >
            Забыли пароль?
          </button>
          <p class="login__signup">
            Нет аккаунта? &nbsp;<router-link to="/registerClient"
              >Перейти
            </router-link>
          </p>
          <p class="login__signup">
            Регистрация для бизнес-пользователя? &nbsp;<router-link
              to="/register"
              >Перейти
            </router-link>
          </p>
          <button type="submit" class="login__submit">
            Войти
          </button>
        </form>
      </div>
    </div>
    <el-dialog
      title="Забыли пароль?"
      :visible.sync="restetPhoneModal"
      custom-class="dialog_cass"
    >
      <span>
        <el-form>
          <el-form-item label="Ваш номер телефона">
            <imask-input
              :mask="$store.state.masks.phone"
              radix="."
              v-model="resetPhone"
              :unmask="true"
              placeholder="номер телефона "
              id="input05"
              class="el-input__inner"
            />
          </el-form-item>
          <el-button @click="resetPhoneMe()">Отправить </el-button>
        </el-form>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="restPassModal" custom-class="dialog_cass">
      <span>
        <el-form>
          <el-form-item label="код подтверждения">
            <el-input type="number" v-model="resetPassModal.otp"> </el-input>
          </el-form-item>
          <el-form-item label="новый пароль">
            <el-input
              placeholder="Password"
              type="password"
              v-model="resetPassModal.password"
              clearable
            >
            </el-input
          ></el-form-item>
          <el-form-item label="подтверждения пароля">
            <el-input
              placeholder="Confirm Password"
              type="password"
              v-model="resetPassModal.confirmPassword"
              clearable
            >
            </el-input
          ></el-form-item>
        </el-form>

        <el-button @click="resetPassword()">Change</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="activateModal" custom-class="dialog_cass">
      <span>
        <el-form>
          <el-form-item label="Код подтверждения">
            <el-input v-model="loginForm.otp"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="login(false)"> Отправить</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      restetPhoneModal: false,
      restPassModal: false,
      resetPhone: "",
      activateModal: false,
      resetPassModal: {
        phoneNumber: "",
        otp: "",
        password: "",
        confirmPassword: ""
      },
      loginForm: {
        login: "",
        password: "",
        client_id: "",
        otp: null
      },
      loginRules: {
        login: [
          {
            required: true,
            message: "Пожалуйста, введите имя пользователя ",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Пожалуйста, введите пароль ",
            trigger: "blur"
          }
        ]
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  methods: {
    resetPhoneMe() {
      this.$store.getters
        .resetPassword(this, this.resetPhone)
        .then(response => {
          this.resetPassModal.phoneNumber = "998" + this.resetPhone;
          this.restetPhoneModal = false;
          this.restPassModal = true;
        });
    },
    resetPassword() {
      this.$store.getters.resetPassModal(this, this.resetPassModal);
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    login(isRemove = true) {
      if (isRemove) {
        this.loginForm.otp = null;
      }
      this.loginForm.client_id = this.loginForm.login;
      this.loading = true;
      this.loginForm.client_id = this.$deviceId() + "";
      this.$store.getters.login(this, this.loginForm).then(response => {
        if (response.result.sended) {
          this.activateModal = true;
          return;
        }
        this.$store.getters.setToken(response.result, this).then(response => {
          this.$router.push({ path: "/" });
        });
      });
      return;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("../style.css");
.dialog_cass {
  width: 300px;
}
</style>
