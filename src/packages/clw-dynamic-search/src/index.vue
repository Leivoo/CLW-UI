<template>
  <div class="border" ref="border">
    <el-form
      :model="realForm"
      ref="searchForm"
      size="mini"
      :label-width="labelWidth"
    >
      <div class="clw_row" ref="row" v-for="(i, index) in form" :key="index">
        <div class="col" v-for="(item, idx) in i" :key="idx">
          <el-form-item :label="item.label">
            <div class="element">
              <el-input
                v-model="realForm[item.val]"
                size="mini"
                clearable
                v-if="item.type === 'input'"
                placeholder="请输入"
                :disabled="item.disabled"
              ></el-input>
              <el-select
                v-model="realForm[item.val]"
                filterable
                :multiple="item.multiple"
                :collapse-tags="item.collapseTags"
                placeholder="请选择"
                size="mini"
                clearable
                :disabled="item.disabled"
                popper-class="clw_select"
                v-if="item.type === 'select'"
              >
                <el-option
                  v-for="i in item.data || linkageData"
                  :key="i.id || i"
                  :label="i.name || i"
                  :value="i.id || i"
                  @click.native="handleLinkage(item, i.id)"
                />
              </el-select>
              <el-date-picker
                v-if="item.type === 'dateTimePicker'"
                v-model="realForm[item.val]"
                clearable
                :editable="false"
                :disabled="item.disabled"
                size="mini"
                popper-class="clw_dateTime"
                :type="item.kind"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
              <treeSelect
                v-if="item.type === 'treeSelect'"
                :data="item.data"
                :defaultProps="item.props"
                :name="item.name"
                v-model="realForm[item.val]"
              />
            </div>
          </el-form-item>
        </div>
        <span v-for="item in stageDom" :key="item.id"></span>
        <div class="opreat" v-if="!isExpands">
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
    <div class="opreat" v-if="isExpands">
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
import { chunk, cloneDeep } from "lodash";
import treeSelect from "../../clw-treeSelect/src/index.vue";
export default {
  name: "CDynamicSearch",
  components: {
    treeSelect,
  },
  props: {
    searchConfig: {
      type: Array,
      default: () => [],
    },
    isExpand: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: "auto",
    },
  },
  data() {
    return {
      form: [],
      realForm: {},
      icon: "el-icon-arrow-up",
      isExpands: false,
      childDom: null,
      cloneForm: [],
      id: "",
      linkageData: [],
      stageDom: [],
    };
  },
  computed: {},
  watch: {
    isExpands(val) {
      this.addInventedDom(this.searchConfig, this.cloneForm);
    },
    searchConfig: {
      handler(val) {
        this.isExpands = this.isExpand;
        if (val.length) {
          // 处理传入的数据
          val.forEach((i) => {
            i.name
              ? this.$set(this.realForm, i.val, i.name)
              : this.$set(this.realForm, i.val, "");
          });
          this.cloneForm = cloneDeep(val);
          this.addInventedDom(val, this.cloneForm);
        }
      },
      immediate: true,
    },
  },
  methods: {
    addInventedDom(val, form) {
      this.stageDom = [];
      if (this.isExpands) {
        // 数组切片
        this.form = chunk(form, 4);
      } else {
        this.icon = "el-icon-arrow-down";
        this.form = chunk(form.slice(0, 3), 3);
      }
      if (val.length < 3) {
        for (let index = 0; index < 3 - val.length; index++) {
          this.stageDom.push({ id: index + 1 });
        }
      }
    },
    // TODO: 展开收起还有逻辑需要调
    handleClick() {
      if (this.isExpands) {
        this.icon = "el-icon-arrow-down";
        this.form = chunk(this.cloneForm.slice(0, 3), 3);
      } else {
        this.icon = "el-icon-arrow-up";
        this.form = chunk(this.cloneForm, 4);
      }
      this.isExpands = !this.isExpands;
    },
    handleLinkage(item, val) {
      if (item.linkage === "parent") {
        this.linkageData = item.data[val].data;
      }
    },
    handleSearch() {
      // console.log(this.realForm, 'success')
      this.$emit("handleSearch", this.realForm);
    },
    handleRefresh() {
      Object.keys(this.realForm).forEach((i) => {
        this.realForm[i] = "";
      });
      this.$emit("handleRefresh", this.realForm);
    },
  },
};
</script>

<style lang="less" scoped>
.border {
  // font-size: 13px;
  min-width: 850px;
  padding: 12px 0 8px 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  .clw_row {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    margin-bottom: 12px;
  }
  .label {
    width: 20%;
  }
  .element {
    width: 90%;
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
/deep/ .el-select {
  width: 100%;
}
/deep/ .el-range-editor--mini {
  width: 310px;
}
/deep/ .el-date-editor .el-range-input {
  width: 100%;
}
</style>
