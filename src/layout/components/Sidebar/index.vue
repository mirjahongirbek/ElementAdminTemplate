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
          v-for="route in myNavs"
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
      bank: [
        {
          name: "epos-terminals",
          meta: { title: "EPOS терминалы", icon : '/sidebar-logo/bank/payment-terminal.svg' ,affix: true },
          path: "epos-terminals"
        },
        {
          name: "attaching-epos-terminals",
          meta: { title: "Прикрепление EPOS", icon : '/sidebar-logo/bank/pos.svg', affix: true },
          path: "attaching-epos-terminals"
        }
        // {
        //   path: "/",
        //   redirect: "noRedirect",
        //   name: "Admin Page",
        //   meta: {
        //     title: "Кабинет банка",
        //     icon: "component"
        //   },
        //   children: [

        //   ]
        // }
      ],
      company: [
        {
          name: "requisites",
          meta: { title: "Реквизиты", icon : '/sidebar-logo/yur/Document.svg', affix: true },
          path: "requisites"
        },
        {
          name: "legal-epos-terminals",
          meta: { title: "EPOS терминал", icon : '/sidebar-logo/yur/pos.svg', affix: true },
          path: "legal-epos-terminals"
        },
        {
          name: "documents",
          meta: { title: "Товары", icon : '/sidebar-logo/yur/Bag.svg', affix: true },
          path: "documents"
        },
        {
          name: "invoice-for-payment",
          meta: { title: "Счета на оплату", icon : '/sidebar-logo/yur/payment-terminal.svg', affix: true },
          path: "invoice-for-payment"
        },
        {
          name: "orders-purchase",
          meta: { title: "Заказы на покупку", icon : '/sidebar-logo/yur/Cart.svg', affix: true },
          path: "orders-purchase"
        }
        // {
        //   path: "/",
        //   redirect: "noRedirect",
        //   name: "Admin Page",
        //   meta: {
        //     title: "Кабинет юр.лица",
        //     icon: "component"
        //   },

        //   children: [
        //     {
        //       name: "requisites",
        //       meta: { title: "Реквизиты", affix: true },
        //       path: "requisites"
        //     },
        //     {
        //       name: "legal-epos-terminals",
        //       meta: { title: "EPOS терминал", affix: true },
        //       path: "legal-epos-terminals"
        //     },
        //     {
        //       name: "products",
        //       meta: { title: "Товары", affix: true },
        //       path: "products"
        //     },
        //     {
        //       name: "invoice-for-payment",
        //       meta: { title: "Счета на оплату", affix: true },
        //       path: "invoice-for-payment"
        //     }
        //   ]
        // }
      ],
      user: [
        {
          name: "all-products",
          meta: { title: "Все товары", icon : '/sidebar-logo/fiz/Grid.svg', affix: true },
          path: "all-products"
        },
        {
          name: "basket",
          meta: { title: "Корзина", icon : '/sidebar-logo/fiz/Cart.svg', affix: true },
          path: "basket"
        },
        {
          name: "my-orders",
          meta: { title: "Мои заказы", icon : '/sidebar-logo/fiz/Bag.svg', affix: true },
          path: "my-orders"
        }
        // {
        //   path: "/",
        //   redirect: "noRedirect",
        //   name: "Admin Page",
        //   meta: {
        //     title: "Кабинет физ.лица",
        //     icon: "component"
        //   },
        //   children: [

        //   ]
        // }
      ]
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
