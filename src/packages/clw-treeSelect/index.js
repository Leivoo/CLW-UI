import CTreeSelect from './src/index.vue'

// 为组件提供 install 方法

CTreeSelect.install = function (Vue) {
  Vue.component(CTreeSelect.name, CTreeSelect)
}

// 导出组件

export default CTreeSelect
