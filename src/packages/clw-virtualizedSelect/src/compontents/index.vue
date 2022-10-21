<template>
  <el-option
    ref="options"
    :key="source[value]"
    :label="source[label]"
    :value="source[value]"
    @click.native="handleClick(source)"
  ></el-option>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    selectList: {
      // 每一行的索引
      type: Array,
      default: () => [40, 41],
    },
    source: {
      // 每一行的内容
      type: Object,
      default() {
        return {}
      },
    },
    label: {
      // 要显示的名称
      type: String,
    },
    value: {
      // 绑定的值
      type: String,
    },
  },
  data() {
    return {
      isCancelSelect: false,
    }
  },
  // computed: {
  //   isSelect() {
  //     return this.selectList.some((i) => i === this.source['value'])
  //   },
  // },
  created() {
    this.isCancelSelect = this.isSelect
    // console.log(this.selectList)
  },
  methods: {
    dispatch(componentName, eventName, ...rest) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(rest))
      }
    },

    handleClick(val) {
      if (this.isSelect) {
        // this.isCancelSelect = false
        console.log(this.$refs['options'].$el.className.split(/\s+/), 22)
        this.$refs['options'].$el.className = ''
      }
      // this.isCancelSelect = this.isSelect ? !this.isSelect : this.isSelect
      this.dispatch('VirtualLists', 'clickVirtualItem', val)
    },
  },
}
</script>
<style lang="less" scoped>
.isSelected {
  color: #409eff;
  font-weight: 700;
  &::after {
    position: absolute;
    right: 20px;
    font-family: element-icons;
    content: '\e6da';
    font-size: 12px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
