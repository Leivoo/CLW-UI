<template>
  <el-popover
    v-model="visibleVirtualList"
    popper-class="select-virtual-list-popover"
    trigger="click"
    placement="bottom-start"
    :width="width"
    @hide="handleHide"
    @show="handleShow"
  >
    <virtual-list
      v-if="visibleVirtualList"
      ref="virtualListRef"
      class="virtual-list"
      :data-key="'id'"
      :keeps="keeps"
      :data-sources="dataLists"
      :data-component="itemComponent"
      :extra-props="{ curId, multiple }"
      :estimate-size="estimateSize"
      :item-class="'list-item-custom-class'"
    ></virtual-list>
    <div slot="reference" class="box">
      <div class="mult">
        <el-tag v-for="tag in tagList" :key="tag" closable :type="tag.type">
          {{ tag }}
        </el-tag>
      </div>
      <el-input
        v-model="curValue"
        :readonly="isReadonly"
        :style="`width:${width}px;`"
        :size="size"
        :placeholder="placeholder"
        :suffix-icon="icon"
        @input="handleInput"
      />
    </div>
  </el-popover>
</template>

<script>
import { cloneDeep } from 'lodash'

import VirtualList from 'vue-virtual-scroll-list'
import VirtualItem from './compontents/index11.vue'
export default {
  name: 'SelectVirtualList',
  props: {
    width: {
      type: Number,
      default: 250,
    },
    size: {
      type: String,
      default: 'small',
    },
    // placeholder: {
    //   type: String,
    //   default: '请选择',
    // },
    dataList: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 虚拟列表在真实 dom 中保持渲染的项目数量
    keeps: {
      type: Number,
      default: 30,
    },
    // 每个项目的估计大小，如果更接近平均大小，则滚动条长度看起来更准确。 建议分配自己计算的平均值。
    estimateSize: {
      type: Number,
      default: 32,
    },
    // input输入触发方法
    virtualInputCall: Function,
    // 点击每个项目触发方法
    virtualClickItemCall: Function,
  },
  components: {
    VirtualList,
  },
  watch: {
    visibleVirtualList(n) {
      if (n) {
        // 当展示虚拟列表时，需要定位到选择的位置
        this.$nextTick(() => {
          let temp = this.curIndex ? this.curIndex : 0
          // 方法一：手动设置滚动位置到指定索引。
          this.$refs.virtualListRef.scrollToIndex(temp - 1)
          // 方法二：手动将滚动位置设置为指定的偏移量。
          // this.$refs.virtualListRef.scrollToOffset(this.estimateSize * (temp - 1));
        })
      }
    },
  },
  data() {
    return {
      curId: null, // 当前选择的 id
      curValue: '', // 当前选择的值
      curIndex: null, // 当前选择的索引
      visibleVirtualList: false, // 是否显示虚拟列表
      itemComponent: VirtualItem, // 由 vue 创建/声明的渲染项组件，它将使用 data-sources 中的数据对象作为渲染道具并命名为：source。
      dataLists: [],
      isReadonly: true,
      multiple: true,
      tagList: 0,
      placeholder: '请选择',
      icon: 'el-icon-arrow-down',
    }
  },
  watch: {
    tagList(val) {
      if (val) {
        console.log(val)
        this.placeholder = ''
      }
    },
  },
  created() {
    this.tagList = 3
    this.dataLists = cloneDeep(this.dataList)
    this.placeholders = this.placeholder
    // 监听点击子组件
    this.$on('clickVirtualItem', (item) => {
      this.curId = item.id
      this.curValue = item.name
      this.curIndex = item.id
      this.visibleVirtualList = this.multiple ? true : false

      console.log('item--->', item)
      this.virtualClickItemCall && this.virtualClickItemCall(item)
    })
  },
  methods: {
    handleHide() {
      this.icon = 'el-icon-arrow-down'
    },
    handleShow() {
      this.icon = 'el-icon-arrow-up'
    },
    // 输入框改变
    handleInput(val) {
      console.log('val--->', val)
      if (!val) {
        this.curId = null
        this.curIndex = null
      }
      // 模糊搜索
      this.dataLists = this.fuzzyQuery(this.dataList, val)

      this.virtualInputCall && this.virtualInputCall(val)
    },
    fuzzyQuery(list, keyWord) {
      let arr = []
      for (var i = 0; i < list.length; i++) {
        if (list[i].name.indexOf(keyWord) >= 0) {
          arr.push(list[i])
        }
      }
      return arr
    },
  },
}
</script>

<style lang="less">
.el-popover.el-popper.select-virtual-list-popover {
  height: 300px;
  padding: 0;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  .virtual-list {
    width: 100%;
    height: calc(100% - 20px);
    padding: 10px 0;
    overflow-y: auto;
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  background-color: #aaa !important;
  border-radius: 10px !important;
}
::-webkit-scrollbar-track {
  background-color: transparent !important;
  border-radius: 10px !important;
  -webkit-box-shadow: none !important;
}
.box {
  margin: 0 auto;
  width: fit-content;
  position: relative;
}
.mult_fa {
  position: relative;
}
.mult {
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
