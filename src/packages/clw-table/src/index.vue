<template>
  <div class="container">
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table
        :header-cell-style="{
          background: '#ebebeb',
          color: 'black',
          fontWeight: 'bold',
          height: '10px',
        }"
        :data="tableData"
        :size="size"
        stripe
        style="width: 100%"
      >
        <template slot="empty">
          <el-empty description="暂无数据"></el-empty>
        </template>
        <el-table-column
          v-for="item in tableConfig"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :formatter="item.render"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>

    <div v-if="isShowPagination" class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.current"
        :page-sizes="pageInfo.pageSizes"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isShowPagination: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableConfig: {
      type: Array,
      default: () => [
        {
          prop: "date",
          label: "xx",
        },
        {
          prop: "name",
          label: "xx",
        },
        {
          prop: "address",
          label: "xx",
        },
        {
          prop: "operate",
          label: "xx",
        },
      ],
    },
    size: {
      type: String,
      default: "medium",
    },
    pageInfo: {
      type: Object,
      default: () => {},
    },
    maxHeight: [String, Number],
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
.pagination {
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 1%;
}
.btn {
  display: flex;
  align-items: center;
}
/deep/ .el-empty {
  height: 220px;
}
</style>