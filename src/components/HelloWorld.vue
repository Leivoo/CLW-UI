<template>
  <div class="box">
    <Search
      :searchConfig="searchConfig"
      :isExpand="false"
      @handleSearch="handleSearch"
    />
    <TreeSelect :data="datas" v-model="value" @handleGetValue="getNode" />
    <Vs :dataList="dataList" />
  </div>
</template>

<script>
import Search from '../packages/clw-dynamic-search/src/index'
import TreeSelect from '../packages/clw-treeSelect/src/index'
import Vs from '../packages/clw-virtualizedSelect/src/index'
export default {
  components: {
    Search,
    TreeSelect,
    Vs,
  },
  data() {
    return {
      searchConfig: [
        {
          label: '涉事船舶',
          type: 'input',
          val: 'shipName',
        },
        {
          label: '发生时间',
          type: 'dateTimePicker',
          val: 'occurrenceTime',
        },
        {
          label: '事件类型',
          type: 'select',
          val: 'eventType',
          data: [1, 2, 3, 4],
        },
        {
          label: '涉事人员',
          type: 'input',
          val: 'personnelInvolved',
          name: '',
        },
        {
          label: '发生区域',
          type: 'input',
          val: 'occurrenceArea',
          name: '',
          data: [],
        },
        {
          label: '上报电话',
          type: 'input',
          val: 'phone',
          name: '',
          data: [],
        },
        {
          label: '处置单位',
          type: 'treeSelect',
          val: 'disposalUnit',
          name: '',
          props: {
            value: 'id', // ID字段名
            label: 'name', // 显示名称
            children: 'children', // 子级字段名
          },
          id: '',
          data: [],
        },
        {
          label: '跟踪警员',
          type: 'select',
          val: 'trackingOfficer',
          collapseTags: true,
          multiple: true,
          name: [],
          data: [],
        },
        {
          label: '结束时间',
          type: 'dateTimePicker',
          name: '',
          val: 'endTime',
          data: '',
        },
      ],
      dataList: [],
      value: '',
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
  created() {
    for (let index = 0; index < 5000; index++) {
      this.dataList.push({ name: `${index}个`, id: index })
    }
  },
  methods: {
    handleSearch(val) {},
    getNode(val1) {},
  },
}
</script>
