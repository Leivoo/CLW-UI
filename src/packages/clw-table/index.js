import CTable from './src/index.vue'

// 为组件提供 install 方法

CTable.install = function (Vue) {
  Vue.component(CTable.name, CTable)
}

// 导出组件

export default CTable
