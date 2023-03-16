<template>
  <div class="box">
    <Search
      :searchConfig="searchConfig"
      :isExpand="true"
      @handleSearch="handleSearch"
      @handleRefresh="handleRefresh"
    />
    <TreeSelect :data="searchConfig[4].data" @handleGetValue="getNode" />
    <clw :tableData="tableData" :isShowPagination="true" :pageInfo="pageInfo" />
  </div>
</template>

<script>
import Search from "../packages/clw-dynamic-search/src/index";
import TreeSelect from "../packages/clw-treeSelect/src/index";
import clw from "../packages/clw-table/src/index.vue";
export default {
  components: {
    Search,
    TreeSelect,
    clw,
  },
  data() {
    return {
      searchConfig: [
        {
          label: "违法行业分类",
          type: "select",
          val: "classType",
          name: "",
          data: [
            {
              data: [
                {
                  id: "22443db37d4e4e6b913eb89b701a6d42",
                  name: "城际客运",
                },
                {
                  id: "fb433b0cfef84127a06731448125d99e",
                  name: "城市客运",
                },
                {
                  id: "1eb8a12e2d8f43ecbbb72c966aadb13b",
                  name: "普通货运",
                },
                {
                  id: "5b9f0abac0f14c4ca26e32b4ed71217a",
                  name: "危险货运",
                },
                {
                  id: "3c50a9f949f24b2995be041f3cc87fad",
                  name: "维修管理",
                },
                {
                  id: "883b929499e54c0381d34eb22c2d5730",
                  name: "车技检测",
                },
                {
                  id: "4989c303cd67405d948fded21bb5f5d4",
                  name: "驾培管理",
                },
                {
                  id: "8c108fdd712349a6966785335274c990",
                  name: "站场管理",
                },
                {
                  id: "dfd51c6870e644ebb71c625bf710c9d8",
                  name: "从业人员",
                },
                {
                  id: "9b180061d63e4a9cbbc58566c4c7e261",
                  name: "租赁物流",
                },
                {
                  id: "369e44c0bcad4d7a8a6b17a0f028d301",
                  name: "其它",
                },
                {
                  id: "05c9e34e90044ca9bf041a211f209820",
                  name: "过期法规",
                },
                {
                  id: "45a364368be044c9aed159c4842cba22",
                  name: "南京市地方性法规、政府规章",
                },
                {
                  id: "9df120a021724b4798336e997ef145a8",
                  name: "无锡市地方性法规、政府规章",
                },
                {
                  id: "9cea5a2d5a2e4197a9741066b98fa097",
                  name: "徐州市地方性法规、政府规章",
                },
                {
                  id: "ee8de71843194d7eabc45e08ded477c1",
                  name: "苏州市地方性法规、政府规章",
                },
                {
                  id: "397a7a21aea04e79baefbe6669f8acf7",
                  name: "常州市地方性法规、政府规章",
                },
                {
                  id: "6a31f126d7ad415a850933678b66276a",
                  name: "公路路政",
                },
                {
                  id: "0dd807202d1f40b48419f9b08873fed3",
                  name: "航道法",
                },
                {
                  id: "1ddfb96f0c0c416183a744e9513bba03",
                  name: "工程质监",
                },
                {
                  id: "69202ae15e8c498da2afc477f2772fe0",
                  name: "海事",
                },
                {
                  id: "8c5aad740f604201a1ddcc90adb13726",
                  name: "港口",
                },
                {
                  id: "e074cd5bfa6b4e0e8516d590f2e4d01c",
                  name: "大气污染防治",
                },
                {
                  id: "fff9af91730f4045bcd1d016ffff9645",
                  name: "污染防治（水上）",
                },
                {
                  id: "ef643e8a428a46ed82d22be76b1c467c",
                  name: "内河交通安全",
                },
                {
                  id: "54c00bd2cc1d4dbc9c0ddcbb49e9b1b6",
                  name: "危险货物（水上）",
                },
                {
                  id: "5be4084031df4fb2b2947795db83c89b",
                  name: "超限",
                },
                {
                  id: "9480cf3e8ae64cea88cc835da3b1a8a7",
                  name: "安全生产",
                },
                {
                  id: "4950482a94fc49eb82739c0621e78670",
                  name: "一超四罚",
                },
                {
                  id: "645ffc6d941a4681a9fd29bd07e1d698",
                  name: "违法超限运输",
                },
              ],
              name: "基础分类",
              id: "0",
            },
            {
              data: [
                {
                  id: "b38a4e81122f4234b03c1b539abd4d9a",
                  name: "公路路政",
                },
                {
                  id: "4166812d242b44dea24afd6e78c40541",
                  name: "道路运政",
                },
                {
                  id: "e28610d53ce346dbb987b81d8cf39945",
                  name: "水路运政",
                },
                {
                  id: "da96082985e54a7e8566c79ebce2d2ba",
                  name: "内河航道",
                },
                {
                  id: "a668094b9480406ebfc7aa2c9c345a13",
                  name: "港口",
                },
                {
                  id: "b500f7f75edb4ab89c49eeae844bf446",
                  name: "地方海事",
                },
                {
                  id: "27c562c50d5f47988ea222a6b1a9d407",
                  name: "工程质量",
                },
              ],
              name: "管理行业分类",
              id: "1",
            },
          ], //违法分类
          linkage: "parent",
        },
        {
          label: "违法行为分类",
          type: "select",
          val: "classId",
          name: "",
          linkage: "son",
        },
        {
          label: "是否启用",
          type: "select",
          val: "state",
          name: "",
          data: [
            {
              id: "0",
              name: "启用",
            },
            {
              id: "1",
              name: "停用",
            },
          ],
        },
        {
          label: "违法行为",
          type: "input",
          val: "illegalName",
          name: "",
        },
        {
          label: "树形下拉框",
          type: "treeSelect",
          val: "tree",
          name: "5",
          data: [
            {
              id: "1",
              name: "一级 1",
              children: [
                {
                  id: "2",
                  name: "二级 1-1",
                  children: [
                    {
                      id: "3",
                      name: "三级 1-1-1",
                    },
                  ],
                },
              ],
            },
            {
              id: "4",
              name: "一级 2",
              children: [
                {
                  id: "5",
                  name: "二级 2-1",
                  children: [
                    {
                      id: "6",
                      name: "三级 2-1-1",
                    },
                  ],
                },
                {
                  id: "7",
                  name: "二级 2-2",
                  children: [
                    {
                      id: "8",
                      name: "三级 2-2-1",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      datas: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 2,
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          tag: "家",
        },
      ],
      pageInfo: {
        cpage: "1",
        total: 0,
        pageSize: 5,
        pageSizes: [10, 20, 30, 50],
      },
    };
  },
  methods: {
    handleSearch(val) {
      console.log(val);
    },
    handleRefresh(val) {
      console.log(val);
    },
    getNode(val) {
      console.log(val, 369);
    },
  },
};
</script>
