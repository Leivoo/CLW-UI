import CTitle from './src/index.vue'

// 为组件提供 install 方法

CTitle.install = function (Vue) {
  Vue.component(CTitle.name, CTitle)
}

// 导出组件

export default CTitle
