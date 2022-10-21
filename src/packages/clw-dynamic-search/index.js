// row/index.js

import CDynamicSearch from './src/index.vue'

// 为组件提供 install 方法

CDynamicSearch.install = function (Vue) {
  Vue.component(CDynamicSearch.name, CDynamicSearch)
}

// 导出组件

export default CDynamicSearch
