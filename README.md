# 基于 elementUI 二次封装的常用业务组件库

## 组件引入方式

```
main.js文件中引入依赖项及样式文件
```

```
import ClwUI from 'clw-ui'
import 'clw-ui/lib/clw-ui.css'
```

## DynamicSearch(动态搜索组件)

- 组件示例

  ```
      <DynamicSearch
        :searchConfig="searchConfig"
        :isExpand="false"
        @handleSearch="handleSearch"
      />
  ```

  ```
  methods:{
    handleSearch(form){
      console.log(form)
    }
  }
  ```

  ```
  data:{
    return {
        searchConfig: [
          {
            label: "涉事船舶",
            type: "input",
            val: "shipName",
            name: "",
            data: []
          },
          {
            label: "发生时间",
            type: "dateTimePicker",
            val: "occurrenceTime",
            name: "",
            data: ""
          },
          {
            label: "事件类型",
            type: "select",
            val: "eventType",
            name: "",
            data: []
          },
          {
            label: "涉事人员",
            type: "input",
            val: "personnelInvolved",
            name: "",
            data: []
          },
          {
            label: "发生区域",
            type: "input",
            val: "occurrenceArea",
            name: "",
            data: []
          },
          {
            label: "上报电话",
            type: "input",
            val: "phone",
            name: "",
            data: []
          },
          {
            label: "处置单位",
            type: "treeSelect",
            val: "disposalUnit",
            name: "",
            props: {
              value: "id", // ID字段名
              label: "name", // 显示名称
              children: "children" // 子级字段名
            },
            id: "",
            data: []
          },
          {
            label: "跟踪警员",
            type: "virtualSelect",
            val: "trackingOfficer",
            collapseTags: true,
            multiple: true,
            name: [],
            data: []
          },
          {
            label: "结束时间",
            type: "dateTimePicker",
            name: "",
            val: "endTime",
            data: ""
          }
        ],
    }
  }
  ```

  目前暂时支持的类型有：input | select | dateTimePicker

- Props:

  | 属性名          | 类型      | 默认值                             | 说明          |
  | ------------ | ------- | ------------------------------- | ----------- |
  | searchConfig | Array   | [Object,Object...] (obj详细字段见下方) | 动态搜索框默认值    |
  | isExpand     | Boolean | false                           | 动态搜索框默认是否展开 |

  1. label:搜索项名称
  2. type:搜索框类型
  3. val：唯一值字段，一般命名为给后端传入的所需字段名
  4. name:搜索框 v-model 默认值
  5. data:适用于 select 类型搜索项

- event:

  | 事件名          | 说明      | 回调参数    |
  | ------------ | ------- | ------- |
  | handleSearch | 点击搜索后触发 | 所有搜索项的值 |

## TreeSelect

+ 组件示例

      <CTreeSelect
        v-model="value"
        :data="datas"
        @handleGetValue="getNode"
      />
      
      export default {
        components: {
          Search,
          TreeSelect,
          Vs,
        },
        data() {
          return {
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
        methods: {
          getNode(val1) {},
        },
      }


+ Props

  | 属性名             | 类型     | 默认值                                      | 说明                   |
  | --------------- | ------ | ---------------------------------------- | -------------------- |
  | treeSelectValue | String | ""                                       | input框中的值            |
  | defaultProps    | Object | { value: 'id', label: 'label', children: 'children' } | 树形数据默认属性（同elementui） |
  | data            | Array  | []                                       | 树形数据值                |
  | id              | String | ""                                       | 用于属性数据选中时的回显效果       |

+ event

  | 事件名            | 说明       | 回调参数      |
  | -------------- | -------- | --------- |
  | handleGetValue | 点击树节点后触发 | 返回点击节点的数据 |

待完善

## VirtualizedSelect(大容量级 select 组件)

待完善

### 源码地址

[github](https://github.com/Leivoo/CLW-UI).
