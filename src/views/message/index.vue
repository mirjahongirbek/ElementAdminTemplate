<template >
  <div>
    <el-row :gutter="24">
      <el-col :span="2">
        <div class="grid-content bg-purple">.</div>
      </el-col>
      <el-col :span="20">
        <br />
        <br />
        <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
        <br />
        <el-row :gutter="24">
          <el-col :span="2">.</el-col>
     
            <el-col v-for="(key, value) in list" :key="value" :span="7">
              <h4>{{key.dateKey}}</h4>
              <el-collapse>
                <el-collapse-item
                  v-for="item in $store.state.lang.messageTypes"
                  v-if="key.messageCount.firstOrDefault(m=>m.messageType== item.value)"
                  :title="item.label"
                >
                  <!-- {{getCount(key, item.value)}} -->
                  <el-table
                    :data="key.messageCount.where(m=>m.messageType== item.value)"
                    style="width: 100%"
                  >
                    <el-table-column prop="providerName" label="Date" width="180"></el-table-column>
                    <el-table-column prop="count" label="Count" width="180"></el-table-column>
                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!--    <el-collapse>
          <el-collapse-item v-for="(key, value) in list" :title="key.dateKey" :name="value">
            <h3 v-if="key.messageCount!=null && key.messageCount.length>0">Success Send Messages</h3>
            <div v-for="o in key.messageCount" :key="o" class="text item">
              {{clients.firstOrDefault(m=>m.id==o.clientId).name}}
              <span
                style="float: right; padding: 3px 0"
              >{{o.count}}</span>
            </div>
            <h3 v-if="key.providerSmsSend!=null && key.providerSmsSend.length>0">Previder Sms Send</h3>
            <div v-for="o in key.providerSmsSend">
              <div>{{clients.firstOrDefault(m=>m.id==o.clientId).name}}</div>
              <span style="float: right; padding: 3px 0">{{o.count}}</span>
            </div>
            <h3
              v-if="key.registerUserSmsSend!=null && key.registerUserSmsSend.length>0"
            >Register User Send Messages</h3>
            <div v-for="o in key.registerUserSmsSend">
              <div>{{clients.firstOrDefault(m=>m.id==o.clientId).name}}</div>
              <span style="float: right; padding: 3px 0">{{o.count}}</span>
            </div>
            <h3
              v-if="key.unRegisterProviderSend!=null && key.unRegisterProviderSend.length>0"
            >UnRegister</h3>
            <div v-for="o in key.unRegisterProviderSend">
              {{o.providerName}}
              {{o.count}}
            </div>
          </el-collapse-item>
        </el-collapse>-->
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>
<script>
import VeBar from "v-charts/lib/bar.common";
export default {
  components: { VeBar },

  data() {
    return {
      chartSettings: {
        labelMap: {
          0: "Success telegram Message Count",
          1: "Error telegram Message Count",
          2: "Provider Send Sms Messages count",
          3: "Register User Sms Send count",
          4: "UnRegiter Provider Send Message count",
          7: "sdcsdcds"
        }
      },
      id: "",
      list: [],
      clients: [],
      chartData: {
        columns: ["dateKey", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        rows: []
      }
    };
  },
  methods: {
    getCount(key, tip) {
      let ss = key.messageCount
        .where(m => m.messageType == tip)
        .sum(m => m.count);
      console.log(ss);
      return ss;
    },
    getDaily() {
      let _this = this;
      if (!this.id) {
        this.$api.get("/message/GetLastDays?from=" + 0 + "&to=" + 20).then(
          response => {
            this.list = response.result.reverse();
            for (let i = 0; i < this.list.length; i++) {
              let me = _this.list[i].messageCount.groupBy(m => m.messageType);

              let obj = {
                dateKey: _this.list[i].dateKey
              };
              for (let j = 0; j < me.length; j++) {
                let count = 0;
                for (let k = 0; k < me[j].values.length; k++) {
                  count += me[j].values[k].count;
                }
                obj[me[j].group] = count;
              }
              _this.chartData.rows.push(obj);
            }
          },
          err => {
            this.$store.getters.errorParse(err, this);
          }
        );
      }
    }
  },
  mounted() {
    this.$store.getters.getClients(this).then(clients => {
      this.clients = clients;
      this.getDaily();
    });
  },
  created() {
    for (let i = 0; i < this.$store.state.lang.messageTypes.length; i++) {
      this.chartSettings.labelMap[
        this.$store.state.lang.messageTypes[i].value
      ] = this.$store.state.lang.messageTypes[i].label;
    }
  }
};
</script>