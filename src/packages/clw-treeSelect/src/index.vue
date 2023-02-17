<template>
  <div ref="container" style="width: 100%">
    <el-popover
      placement="bottom-start"
      ref="pop"
      trigger="click"
      :close-delay="100"
      :append-to-body="false"
      popper-class="treeSelect_popper"
      @show="showPopover"
      @hide="hidePopover"
    >
      <el-input
        :readonly="true"
        placeholder="请输入"
        size="mini"
        slot="reference"
        suffix-icon="el-icon-arrow-down"
        v-model="treeSelectValue"
        clearable
      />
      <div style="padding-left: 2%">
        <el-input
          placeholder="请输入筛选值"
          v-model="filterVal"
          clearable
          suffix-icon="el-icon-search"
        />
      </div>
      <div class="content">
        <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          highlight-current
          :current-node-key="currentNode"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        />
      </div>
    </el-popover>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'CTreeSelect',
  data() {
    return {
      filterVal: '',
      valueArr: [],
      currentNode: '',
      treeData: [],
    }
  },
  model: {
    prop: 'treeSelectValue',
    event: 'selectcChange',
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    treeSelectValue: {
      type: String,
      default: '',
    },
    defaultProps: {
      type: Object,
      default: () => {
        return { value: 'id', label: 'label', children: 'children' }
      },
    },
    // TODO: 接收树形数据
    data: {
      type: Array,
      required: true,
    },
  },
  watch: {
    data(val) {
      this.treeData = cloneDeep(val)
    },
    filterVal(val) {
      this.$refs.tree.filter(val)
    },
    id(val) {
      console.log(val, 'id')
      this.currentNode = this.id
      this.$nextTick(() => {
        this.$refs['tree'].setCurrentKey(this.id)
      })
    },
  },
  created() {},
  methods: {
    showPopver() {},
    handleNodeClick(data, node) {
      this.handleGetNodeName(node)
      this.currentNode = data?.id
      this.$nextTick(() => {
        this.$refs['tree'].setCurrentKey(this.currentNode)
      })
      this.$emit('selectcChange', data.label)
      this.$emit('handleGetValue', {
        data,
        node,
      })
    },
    // 获取节点名称递归
    handleGetNodeName(node) {
      if (node.parent.label) {
        this.valueArr.unshift(node.parent.label)
        this.handleGetNodeName(node.parent)
      }
    },
    filterNode(value, data) {
      console.log(value, data, '树')
      if (!value) return true
      return data?.label?.indexOf(value) !== -1
    },
  },
}
</script>
<style lang="less" scoped>
.content {
  margin-top: 10px;
  height: 200px;
  padding-left: 2%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
}
</style>
<style lang="less">
.treeSelect_popper {
  width: 100%;
}
</style>
