// packages/index.js

import CDynamicSearch from './clw-dynamic-search/index'
import CTreeSelect from './clw-treeSelect/index'
import CVirtualizedSelect from './clw-virtualizedSelect/index'

// 组件集合，用于遍历

const components = [CDynamicSearch, CTreeSelect, CVirtualizedSelect]

// 定义 install 方法

const install = function (Vue) {
  if (install.installed) return

  // 遍历注册全局组件

  components.map((component) => Vue.component(component.name, component))
}

// 判断是否是直接引入文件

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install, // 导出的对象必须具备一个 install 方法
  ...components, // 组件列表
}
