<template>
  <div class="border" ref="border">
    <el-form :model="realForm" ref="searchForm">
      <div class="row" v-for="(i, index) in form" :key="index">
        <div class="col" v-for="(item, idx) in i" :key="idx">
          <el-form-item :label="item.label">
            <!-- <span class="label">{{ item.label }}:</span> -->
            <div class="element">
              <el-input
                v-model="realForm[item.val]"
                size="mini"
                clearable
                v-if="item.type === 'input'"
                placeholder="请输入"
              ></el-input>
              <el-select
                v-model="realForm[item.val]"
                filterable
                :multiple="item.multiple"
                :collapse-tags="item.collapseTags"
                placeholder="请选择"
                size="mini"
                clearable
                popper-class="clw_select"
                v-if="item.type === 'select'"
              >
                <el-option
                  v-for="i in item.data"
                  :key="i.id || i"
                  :label="i.name || i"
                  :value="i.id || i"
                />
              </el-select>
              <el-date-picker
                v-if="item.type === 'dateTimePicker'"
                v-model="realForm[item.val]"
                clearable
                :editable="false"
                size="mini"
                popper-class="clw_dateTime"
                type="datetime"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
        <div class="opreat" v-show="!isExpands">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="handleSearch"
            >搜索</el-button
          >
          <el-button size="small" icon="el-icon-refresh" @click="handleRefresh"
            >重置</el-button
          >
          <el-button
            icon="el-icon-arrow-down"
            size="small"
            @click="handleClick"
          ></el-button>
        </div>
      </div>
    </el-form>
    <div class="opreat" v-show="isExpands">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="handleSearch"
        >搜索</el-button
      >
      <el-button size="small" icon="el-icon-refresh" @click="handleRefresh"
        >重置</el-button
      >
      <el-button :icon="icon" size="small" @click="handleClick"></el-button>
    </div>
  </div>
</template>

<script>
import { chunk, cloneDeep } from 'lodash'
export default {
  name: 'CDynamicSearch',
  props: {
    searchConfig: {
      type: Array,
      default: () => [],
    },
    isExpand: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: [],
      realForm: {},
      icon: 'el-icon-arrow-up',
      isExpands: false,
      childDom: null,
      cloneForm: [],
    }
  },
  computed: {},
  watch: {
    isExpand: {
      handler(val) {
        this.isExpands = val
        // 处理传入的数据
        this.searchConfig.forEach((i) => {
          this.$set(this.realForm, i.val, '')
        })
        this.cloneForm = cloneDeep(this.searchConfig)
        if (val) {
          // 数组切片
          this.form = chunk(this.cloneForm, 4)
        } else {
          this.icon = 'el-icon-arrow-down'
          this.form = chunk(this.cloneForm.slice(0, 3), 3)
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    if (this.searchConfig.length < 3) {
      const dom = document.querySelector('.row')
      this.childDom = dom.children[dom.children.length - 1]
      for (let index = 0; index < 3 - this.searchConfig.length; index++) {
        dom.insertBefore(document.createElement('span'), this.childDom)
      }
    }
  },
  methods: {
    // TODO: 展开收起还有逻辑需要调
    handleClick() {
      if (this.isExpands) {
        this.icon = 'el-icon-arrow-down'
        this.form = chunk(this.cloneForm.slice(0, 3), 3)
      } else {
        this.icon = 'el-icon-arrow-up'
        this.form = chunk(this.cloneForm, 4)
      }
      this.isExpands = !this.isExpands
    },
    handleSearch() {
      console.log(this.realForm, 'success')
      this.$emit('handleSearch', this.realForm)
    },
    handleRefresh() {
      Object.keys(this.realForm).forEach((i) => {
        this.realForm[i] = ''
      })
    },
  },
}
</script>

<style lang="less" scoped>
.border {
  // font-size: 13px;
  min-width: 850px;
  padding: 12px 0 8px 12px;
  border: 1px solid #ccc;
  overflow: hidden;
  .row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 12px;
    .col {
      // display: flex;
      // justify-content: center;
      // align-items: center;
    }
  }
  .label {
    width: 20%;
  }
  .element {
    display: flex;
    margin-left: 8px;
    // margin-bottom: 16px;
    width: 50%;
  }
  .opreat {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 12px;
  }
}
/deep/ .el-form-item {
  margin-bottom: 0;
}
</style>
