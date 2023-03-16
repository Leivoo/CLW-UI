<template>
  <div ref="container" style="width: 100%">
    <el-popover
      v-model="visible"
      placement="bottom-start"
      ref="pop"
      trigger="click"
      :close-delay="100"
      :append-to-body="true"
      popper-class="treeSelect_popper"
      @show="showPopover"
      @hide="hidePopover"
    >
      <el-input
        v-if="!isId"
        :readonly="true"
        placeholder="请输入"
        size="mini"
        slot="reference"
        suffix-icon="el-icon-arrow-down"
        v-model="treeSelectValue"
        clearable
      />
      <el-input
        v-else
        :readonly="true"
        placeholder="请输入"
        size="mini"
        slot="reference"
        suffix-icon="el-icon-arrow-down"
        v-model="isId"
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
          :data="data"
          node-key="id"
          :props="defaultProps"
          highlight-current
          :current-node-key="currentNode"
          :filter-node-method="filterNode"
          :default-expand-all="true"
          @node-click="handleNodeClick"
          @setChecked="handleChecked"
        />
      </div>
    </el-popover>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";

export default {
  name: "CTreeSelect",
  data() {
    return {
      filterVal: "",
      valueArr: [],
      currentNode: "",
      treeData: [],
      visible: false,
      isId: "",
    };
  },
  model: {
    prop: "treeSelectValue",
    event: "selectChange",
  },
  props: {
    name: [String, Number],
    treeSelectValue: {
      type: String,
      default: "",
    },
    defaultProps: {
      type: Object,
      default: () => {
        return { value: "id", label: "name", children: "children" };
      },
    },
    // TODO: 接收树形数据
    data: {
      type: Array,
      required: true,
    },
  },
  watch: {
    data: {
      handler(val) {
        this.treeData = cloneDeep(val);
        this.findName(this.treeData);
      },
      immediate: true,
    },
    filterVal(val) {
      this.$refs.tree.filter(val);
    },
    name: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs["tree"].setCurrentKey(val);
        });
      },
      immediate: true,
    },
    treeSelectValue(val) {
      if (!val) {
        this.isId = "";
      }
    },
  },
  created() {},
  methods: {
    showPopover() {
      this.$refs["tree"].setCurrentKey(this.isId);
    },
    hidePopover() {},
    handleChecked() {},
    handleNodeClick(data, node) {
      this.visible = false;
      // this.$emit("update:id", data?.id);
      this.handleGetNodeName(node);
      this.currentNode = data?.id;
      this.$nextTick(() => {
        this.$refs["tree"].setCurrentKey(this.currentNode);
      });
      this.isId = data.name;
      this.$emit("selectChange", data.id);
      // console.log(this.treeSelectValue, data.name, 78);
      this.$emit("handleGetValue", {
        data,
        node,
      });
    },
    // 获取节点名称递归
    handleGetNodeName(node) {
      if (node.parent.name) {
        this.valueArr.unshift(node.parent.name);
        this.handleGetNodeName(node.parent);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data?.name?.indexOf(value) !== -1;
    },
    findName(data) {
      data.forEach((i) => {
        if (this.name === i.id) {
          this.isId = i.name;
        } else if (i?.children) {
          this.findName(i.children);
        }
      });
    },
  },
};
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
