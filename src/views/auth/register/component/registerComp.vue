<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <div class="title-container">
          <h1 style="font-size: 20px; text-align: center;" class="title">
            Регистрация
          </h1>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form>
          <el-form-item label="ЭЦП">
            <el-select
              filterable
              placeholder="Выбирайте электрон цифровой подпись"
              clearable="true"
              v-model="selecerf"
            >
              <el-option
                v-for="(key, value) in datakeys"
                :key="value"
                :value="key"
              >
                {{ key.CN }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ИНН">
            <el-input
              v-model="selectData.tin"
              type="text"
              disabled
              tabindex="4"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item label="ФИО директора">
            <el-input
              disabled
              :placeholder="
                selectData.userLastName +
                ' ' +
                selectData.userFirstName +
                ' ' +
                selectData.userMiddleName
              "
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="username" label="Номер телефона">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <div class="el-input el-input--medium">
            <imask-input
              :mask="$store.state.masks.phone"
              radix="."
              class="el-input__inner"
              v-model="selectData.login"
              :unmask="true"
              id="input05"
            />
          </div>
        </el-form-item>
        <el-form-item prop="password" label="Пароль">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="selectData.password"
            :type="passwordType"
            placeholder="Пароль"
            name="password"
            tabindex="2"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="password" label="Подтвердите пароль">
          <span class="svg-container">
            <svg-icon icon-class="confirmPassword" />
          </span>
          <el-input
            :key="passwordType"
            v-model="selectData.confirmPassword"
            :type="passwordType"
            placeholder="Пароль"
            name="password"
            tabindex="2"
            autocomplete="on"
        /></el-form-item>
      </el-col>
    </el-row>
    <el-button
      :loading="loading"
      type="primary"
      style="width: 100%; margin-bottom: 30px;"
      @click.native.prevent="register"
      >Зарегистрироваться
    </el-button>
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
let EIMZO_MAJOR = 3;
let EIMZO_MINOR = 37;
let errorCAPIWS =
  "Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.";
let errorBrowserWS =
  "Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.";
let errorUpdateApp =
  'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
let errorWrongPassword = "Пароль неверный.";
let info = function () {
  let itm = document.testform.key.value;
  if (itm) {
    let id = document.getElementById(itm);
    let vo = JSON.parse(id.getAttribute("vo"));
    let alias = vo.alias;
    alias = alias.replaceAll(",", '","').replaceAll("=", '":"');
    let str = '{"' + alias + '"}';
    let obj = JSON.parse(str);
    if (obj.t === "direktor") alert("Director");
    else alert("Not director");
  }
};
String.prototype.replaceAll = function (search, replace) {
  return this.split(search).join(replace);
};
let AppLoad = function (_this) {
  EIMZOClient.API_KEYS = [
    "localhost",
    "96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B",
    "127.0.0.1",
    "A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F",
    //'null', 'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D',
    "dls.yt.uz",
    "EDC1D4AB5B02066FB3FEB9382DE6A7F8CBD095E46474B07568BC44C8DAE27B3893E75B79280EA82A38AD42D10EA0D600E6CE7E89D1629221E4363E2D78650516",
  ];
  EIMZOClient.checkVersion(
    function (major, minor) {
      let newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
      let installedVersion = parseInt(major) * 100 + parseInt(minor);
      if (installedVersion < newVersion) {
        uiUpdateApp();
      } else {
        EIMZOClient.installApiKeys(
          function () {
            uiLoadKeys(_this);
          },
          function (e, r) {
            if (r) {
              uiShowMessage(r);
            } else {
              wsError(e);
            }
          }
        );
      }
    },
    function (e, r) {
      if (r) {
        uiShowMessage(r);
      } else {
        uiNotLoaded(e);
      }
    }
  );
};
let uiShowMessage = function (message) {
  alert(message);
};
let uiNotLoaded = function (e) {
  let l = document.getElementById("message");
  l.innerHTML = "";
  if (e) {
    wsError(e);
  } else {
    uiShowMessage(errorBrowserWS);
  }
};
let uiUpdateApp = function () {
  let l = document.getElementById("message");
  l.innerHTML = errorUpdateApp;
};
let uiLoadKeys = function (_this) {
  EIMZOClient.listAllUserKeys(
    function (o, i) {
      return "itm-" + o.serialNumber + "-" + i;
    },
    function (itemId, v) {
      _this.addOpt(itemId, v);
      return null;
    },
    function (items, firstId) {
      return "";
    },
    function (e, r) {
      //uiShowMessage(errorCAPIWS);
    }
  );
};
let wsError = function (e) {
  if (e) {
    uiShowMessage(errorCAPIWS + " : " + e);
  } else {
    uiShowMessage(errorBrowserWS);
  }
};
export default {
  name: "register Company",
  components: {},
  data() {
    return {
      activateModal: false,
      datakeys: [],
      temp: [],
      activateMe: {
        phoneNumber: "",
        otp: "",
      },
      selectData: {
        id: 0,
        name: "",
        tin: "",
        businessCategory: "",
        region: "",
        district: "",
        dSKeyNumber: "",
        dSKeySerial: "",
        telefon: "",
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
        userLastName: "",
        userFirstName: "",
        userMiddleName: "",
        userPosition: "",
        userInn: "",
      },
      tempKomp: {},
      selecerf: "",
      isChecked: false,
      loginForm: {
        username: "",
        password: "",
        phone: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "Пожалуйста, введите имя пользователя ",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Пожалуйста, введите пароль ",
            trigger: "blur",
          },
        ],
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  methods: {
    validate() {
      if (!this.selectData.login || !this.selectData.password) {
        alert("логин или пароль не написаны");
        return false;
      }
      if (this.selectData.password != this.selectData.confirmPassword) {
        alert("пароль не совпадает");
        return false;
      }
      if (!this.selectData.tin) {
        alert("выберете ЕЦП");
        return false;
      }
      return true;
    },
    goActivate() {
      this.$api
        .put(
          "/api-company/Company/ClientActive?phoneNumber=" +
            this.activateMe.phoneNumber +
            "&otp=" +
            this.activateMe.otp
        )
        .then(
          (response) => {
            this.activateModal = false;
            this.$router.push({ path: "/login" });
          },
          (err) => this.$store.getters.errorParse(err, this)
        );
    },
    register() {
      if (!this.validate()) {
        return;
      }
      this.$store.getters
        .registerCompany(this, this.selectData)
        .then((response) => {
          this.activateMe.phoneNumber = "998" + this.selectData.login;
          this.activateModal = true;
        });
      return;
    },
    addOpt(e, v) {
      this.datakeys.push(v);
      this.temp.push(e);
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
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    sign(jsonData, callback = null) {
      console.log(jsonData);
      this.callbackApi = callback;
      let _this = this;
      var itm = document.testform.key.value;

      if (itm) {
        var id = document.getElementById(itm);
        console.log(id, "id", "itm", itm);
        var vo = JSON.parse(id.getAttribute("vo"));
        _this.keyCode = _this.getKeyToStore();
        if (_this.keyCode) {
          console.log("before create");
          EIMZOClient.createPkcs7(
            _this.keyCode,
            jsonData,
            _this.timeStamper,
            function (pkcs7) {
              _this.pcksSeven = pkcs7;

              if (callback) {
                //console.log('callback');
                callback(pkcs7);
              } else {
                //console.log('no callback');
              }
            },
            function (e, r) {
              console.log("has error", e, r);
              if (r) {
                if (r.indexOf("BadPaddingException") != -1) {
                  _this.uiShowMessage(errorWrongPassword);
                } else {
                  _this.uiShowMessage(r);
                }
              } else {
                _this.pcksSeven = "";
                _this.uiShowMessage(errorBrowserWS);
              }
              if (e) _this.wsError(e);
            }
          );
        } else {
          EIMZOClient.loadKey(
            vo,
            function (id) {
              _this.addKeyToStore(id);
              _this.keyCode = id;

              console.log(id);

              EIMZOClient.createPkcs7(
                id,
                jsonData,
                _this.timeStamper,
                function (pkcs7) {
                  if (callback) {
                    callback(pkcs7);
                  } else {
                    //console.log('no callback');
                  }
                  _this.pcksSeven = pkcs7;
                },
                function (e, r) {
                  if (r) {
                    if (r.indexOf("BadPaddingException") != -1) {
                      _this.uiShowMessage(errorWrongPassword);
                    } else {
                      _this.uiShowMessage(r);
                    }
                  } else {
                    _this.removeKeyToStore();
                    _this.keyCode = "";
                    _this.uiShowMessage(errorBrowserWS);
                  }
                  if (e) _this.wsError(e);
                }
              );
            },
            function (e, r) {
              if (r) {
                if (r.indexOf("BadPaddingException") != -1) {
                  _this.uiShowMessage(errorWrongPassword);
                } else {
                  _this.uiShowMessage(r);
                }
              } else {
                _this.uiShowMessage(errorBrowserWS);
              }
              if (e) _this.wsError(e);
            }
          );
        }
      }
    },
    setKey(komp) {
      this.tempKomp = komp;
      let alias = komp.alias; //this.datakeys[val].alias;
      alias = alias.replaceAll(",", '","').replaceAll("=", '":"');
      let str = '{"' + alias + '"}';

      let obj = JSON.parse(str);
      this.selectData.name = komp.O;
      this.selectData.userPosition = komp.T;
      this.selectData.userFirstName = komp.CN.split(" ")[1];
      this.selectData.userLastName = komp.CN.split(" ")[0];
      this.selectData.userMiddleName = komp.CN.split(" ")[2];
      this.selectData.userInn = komp.UID;
      this.selectData.dSKeySerial = komp.serialNumber;
      this.selectData.dSKeyNumber = komp.name;
      this.selectData.region = obj.st;
      this.selectData.district = obj.l;
      this.selectData.tin = komp.TIN;
      this.selectData.businessCategory = obj.businesscategory;
    },
    getKey(item) {
      return new Promise((resolve, reject) => {
        EIMZOClient.loadKey(item, function (val) {
          resolve(val);
        });
      });
    },

    chekPassword(keyId, jsData) {
      let _this = this;
      return new Promise((resolve, reject) => {
        EIMZOClient.createPkcs7(
          keyId,
          "salom dunyo",
          null,
          function (val) {
            resolve(val);
          },
          function (err) {
            _this.$store.getters.notify(
              _this,
              "error",
              "пароль введен неправильно"
            );
          }
        );
      });
    },
  },
  mounted() {
    window.onload = AppLoad(this);
  },
  watch: {
    selecerf: function (val) {
      let komp = val;
      this.getKey(val).then((response) => {
        this.chekPassword(response, val).then((response) => {
          this.setKey(val);
        });
      });
    },
  },
};
</script>
