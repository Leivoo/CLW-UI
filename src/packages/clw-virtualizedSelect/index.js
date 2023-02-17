import CVirtualizedSelect from './src/index.vue'

// 为组件提供 install 方法

CVirtualizedSelect.install = function (Vue) {
  Vue.component(CVirtualizedSelect.name, CVirtualizedSelect)
}

// 导出组件

export default CVirtualizedSelect
