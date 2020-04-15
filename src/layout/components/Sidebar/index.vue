<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      {{ activeMenu }}
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in $store.state.lite.menu"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        /> 
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import router from "../../../router";
export default {
  components: { SidebarItem, Logo },
  data: function() {
    return {
     
    };
  },
  created() {},
  computed: {
    ...mapGetters(["sidebar"]),
    myNavs() {
      let sss = localStorage.getItem("structure_id");
      if (sss == 2) {
        return this.company;
      } else if (sss == 3) return this.user;
      else if (sss == 1) return this.bank;
      else return [];
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return true;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
