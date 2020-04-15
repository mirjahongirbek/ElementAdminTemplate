const state = {
  menu: [{
      name: "epos-terminals",
      meta: {
        title: "Lite Epos",
        icon: '/sidebar-logo/bank/payment-terminal.svg',
        affix: true
      },
      path: "epos-terminals"
    },
    {
      name: "attaching-epos-terminals",
      meta: {
        title: "Lite Epos1",
        icon: '/sidebar-logo/bank/pos.svg',
        affix: true
      },
      path: "attaching-epos-terminals"
    }
  ],
  panels: [{
      text: "text",
      icon: "peoples",
      value: 3000
    },
    {
      text: "text1",
      icon: "bug",
      value: 2999
    },
    {
      text: "text2",
      icon: "eye",
      value: 2998
    },
    {
      text: "text3",
      icon: "money",
      value: 2997
    }
  ],
  chart:{
    xData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yData:[{data:[1,2,3,4,5,6,7]},{data:[5,6,8,9,7,6,5]}]
  }

}

export default {
  namespaced: true,
  state
}
