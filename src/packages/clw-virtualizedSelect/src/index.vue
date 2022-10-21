<template>
  <el-select
    @visible-change="visibleVirtualoptions"
    v-model="values"
    popper-class="virtualSelect"
    :filter-method="filterData"
    :filterable="multiple"
    :multiple="multiple"
    :clearable="clearable"
    :size="size"
    collapse-tags
  >
    <VirtualList
      style="max-height: 245px; overflow-y: auto"
      ref="virtualSelect"
      class="virtual_style"
      :data-key="'value'"
      :data-sources="mediaAccountArr"
      :data-component="itemComponent"
      :keeps="50"
      :extra-props="{
        label: 'label',
        value: 'value',
      }"
    />
  </el-select>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import VirtualItem from './compontents/index.vue'

export default {
  name: 'VirtualLists',
  components: {
    VirtualList,
  },
  props: {
    optionsData: {
      type: Array,
      default: () => [],
    },
    keeps: {
      type: Number,
      default: 30,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    multipleLimit: {
      type: Number,
      default: 0,
    },
    size: {
      type: Boolean,
      default: 'mini',
    },
    selectVal: {
      type: [String, Array],
      default: '',
    },
  },
  data() {
    return {
      mediaAccountArr: this.optionsData,
      itemComponent: VirtualItem,
      virtualoptions: [], // 在定义个存全量数据的数组
      chooseList: [],
      values: this.selectVal,
    }
  },
  watch: {
    optionData(val) {
      this.mediaAccountArr = cloneDeep(val)
      this.chooseList = []
      console.log(this.mediaAccountArr, 'option')
      // TODO: 数据处理排序 优先将选中数据放至数据列开头解决虚拟滚动的回显问题
      if (this.mediaAccount.length) {
        let obj = {}
        this.mediaAccount.forEach((i) => {
          this.chooseList.push(
            ...this.mediaAccountArr.filter((item) => i == item.value)
          )
        })
        this.mediaAccountArr = [...this.chooseList, ...this.mediaAccountArr]
        this.mediaAccountArr = this.mediaAccountArr.reduce((cur, next) => {
          obj[next.value] ? '' : (obj[next.value] = true && cur.push(next))
          return cur
        }, [])
      }
      this.virtualoptions = this.mediaAccountArr
    },
    values(val) {
      this.$emit('update:selectVal', val)
    },
  },
  methods: {
    filterData(val) {
      this.$nextTick(() => {
        this.mediaAccountArr = this.fuzzyQuery(val)
      })
    },
    visibleVirtualoptions(bool) {
      if (!bool) {
        this.$refs['virtualSelect'].reset()
        this.$nextTick(() => {
          this.mediaAccountArr = this.virtualoptions
        })
      }
    },
    fuzzyQuery(keyWord) {
      let arr = []
      this.virtualoptions.forEach((i) => {
        if (i['label'].indexOf(keyWord) >= 0) {
          arr.push(i)
        }
      })
      return arr
    },
  },
}
</script>

<style lang="less" scoped>
.virtualSelect .el-scrollbar .el-scrollbar__bar.is-vertical {
  width: 0;
}
.virtual_style::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
.virtual_style::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 18%;
  background-color: #ccc;
}
</style>
