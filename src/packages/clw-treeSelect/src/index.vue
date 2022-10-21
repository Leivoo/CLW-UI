<template>
  <div ref="container" style="width: 100%">
    <el-popover
      placement="bottom-start"
      ref="pop"
      trigger="click"
      :close-delay="100"
      :append-to-body="false"
      popper-class="treeSelect_popper"
    >
      <el-input
        :readonly="true"
        placeholder="请输入"
        size="mini"
        slot="reference"
        suffix-icon="el-icon-arrow-down"
        v-model="value"
        clearable
      />
      <div style="padding-left: 2%">
        <el-input
          placeholder="请输入筛选值"
          v-model="filterVal"
          size="mini"
          clearable
          suffix-icon="el-icon-search"
        />
      </div>
      <div class="content">
        <el-tree
          ref="tree"
          :data="datas"
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
export default {
  name: 'treeSelect',
  data() {
    return {
      value: '',
      filterVal: '',
      valueArr: [],
      containerWidth: 400,
      currentNode: '',
      defaultProp: {
        children: 'children',
        label: 'label',
      },
      datas: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  model: {
    prop: 'defaultValue',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    dpName: {
      type: String,
      default: '',
    },
    form: {
      type: Array,
      default: () => [],
    },
    defaultProps: {
      type: Object,
      default: () => {
        return { value: 'id', label: 'label', children: 'children' }
      },
    },
    width: {
      type: Number,
    },
    // tree 选项
    data: {
      type: Array,
      required: true,
    },
    defaultValue: {
      type: String,
    },
    // 是否显示所有层级
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    // 分隔符
    separator: {
      type: String,
      default: '/',
    },
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler(val) {
        this.value = val
      },
    },
    filterVal(val) {
      this.$refs.tree.filter(val)
    },
    dpName(val) {
      this.value = val
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
  mounted() {
    // console.log(this.$refs.container.offsetWidth);
    // this.containerWidth = this.$refs.container.offsetWidth;
    this.$refs('pop').style.height = this.$refs('container').style.height
  },
  methods: {
    // 清空form表单校验（自定义组件）
    // this.$refs['formItem'].$emit('el.form.blur', v)
    handleNodeClick(data, node) {
      console.log(data, node)
      // this.valueArr = [];
      this.handleGetNodeName(node)
      // this.valueArr.push(data[this.defaultProps.label]);
      // if (this.showAllLevels) {
      //   this.value = this.valueArr.join(this.separator);
      // } else {
      //   this.value = this.valueArr[this.valueArr.length - 1];
      // }
      this.currentNode = data.id
      this.$nextTick(() => {
        this.$refs['tree'].setCurrentKey(this.currentNode)
      })
      console.log(this.form, 'node')
      this.value = data.name
      this.form.forEach((i) => {
        if (i.label === '处置单位') {
          i.id = this.currentNode
        }
      })
      this.$emit('change', this.value)
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
      console.log(data, '树')
      if (!value) return true
      return data?.name?.indexOf(value) !== -1
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
