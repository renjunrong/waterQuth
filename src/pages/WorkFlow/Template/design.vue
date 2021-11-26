<template>
  <div class="design">
    <div>
      <button v-show="false" @click="disposeClk">处理数据</button>
    </div>
    <SuperFlow
      ref="superFlow"
      :node-list="nodeList"
      :link-list="linkList"
      :origin="origin"
      :graph-menu="graphMenuList"
      :node-menu="nodeMenuList"
      :link-menu="linkMenuList"
      :enter-intercept="enterIntercept"
      :output-intercept="outputIntercept"
      :link-desc="linkDesc"
    >
      <template v-slot:node="{ meta }">
        <div :class="`flow-node flow-node-${meta.prop}`">
          <header class="ellipsis">
            {{ meta.name }}
          </header>
          <section>
            {{ meta.desc }}
          </section>
        </div>
      </template>
    </SuperFlow>

    <el-dialog
      :title="drawerConf.title"
      :visible.sync="drawerConf.visible"
      :close-on-click-modal="false"
      width="500px"
    >
      <el-form
        v-show="drawerConf.type === drawerType.node"
        ref="nodeSetting"
        :model="nodeSetting"
        @keyup.native.enter="settingSubmit"
        @submit.native.prevent
      >
        <el-form-item label="节点名称" prop="name">
          <el-input
            v-model="nodeSetting.name"
            placeholder="请输入节点名称"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="节点描述" prop="desc">
          <el-input
            v-model="nodeSetting.desc"
            placeholder="请输入节点描述"
            maxlength="30"
          />
        </el-form-item>
      </el-form>
      <el-form
        v-show="drawerConf.type === drawerType.link"
        ref="linkSetting"
        :model="linkSetting"
        @keyup.native.enter="settingSubmit"
        @submit.native.prevent
      >
        <el-form-item label="连线描述" prop="name">
          <el-input v-model="linkSetting.name" placeholder="请输入连线描述" />
          <el-input
            v-model="linkSetting.conditionsequenceflow"
            placeholder="请输入连线条件"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drawerConf.cancel"> 取 消 </el-button>
        <el-button type="primary" @click="settingSubmit"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'
import designData from './designData.json'
import api from '@/api/model.js'

const drawerType = {
  node: 0,
  link: 1
}
const nodeObj = {
  resourceId: '',
  properties: {
    overrideid: '',
    name: '',
    documentation: '',
    executionlisteners: '',
    initiator: '',
    formkeydefinition: '',
    formproperties: ''
  },
  stencil: {
    id: ''
  },
  childShapes: [],
  outgoing: [],
  bounds: {
    lowerRight: {
      x: 465,
      y: 45
    },
    upperLeft: {
      x: 435,
      y: 15
    }
  },
  dockers: [
    {
      x: 15,
      y: 15
    },
    {
      x: 50,
      y: 40
    }
  ],
  target: {}
}

export default {
  components: {
    SuperFlow
  },
  data() {
    return {
      drawerType,
      designData,
      nodeObj,
      doneList: [], // 实时图的数据
      // 判断是节点编辑还是连线编辑
      drawerConf: {
        title: '',
        visible: false,
        type: null,
        info: null,
        open: (type, info) => {
          const conf = this.drawerConf
          conf.visible = true
          conf.type = type
          conf.info = info
          if (conf.type === drawerType.node) {
            conf.title = '节点'
            if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
            this.$set(this.nodeSetting, 'name', info.meta.name)
            this.$set(this.nodeSetting, 'desc', info.meta.desc)
          } else {
            conf.title = '连线'
            if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
            this.$set(
              this.linkSetting,
              'name',
              info.meta ? info.meta.name : ''
            )
          }
        },
        cancel: () => {
          this.drawerConf.visible = false
          if (this.drawerConf.type === drawerType.node) {
            this.$refs.nodeSetting.clearValidate()
          } else {
            this.$refs.linkSetting.clearValidate()
          }
        }
      },
      linkSetting: {
        desc: '',
        name: '',
        conditionsequenceflow: ''
      },
      nodeSetting: {
        name: '',
        desc: ''
      },
      origin: [1500, 1000], // 二维坐标系原点
      nodeList: [], // 默认节点
      linkList: [], // 初始化连线节点
      // 空白右键事件
      graphMenuList: [
        [
          {
            label: '开始节点',
            disable(graph) {
              return !!graph.nodeList.find(
                node => node.meta.prop === 'StartNoneEvent'
              )
            },
            selected: (graph, coordinate) => {
              const StartNoneEvent = graph.nodeList.find(
                node => node.meta.prop === 'StartNoneEvent'
              )
              if (!StartNoneEvent) {
                graph.addNode({
                  width: 140,
                  height: 70,
                  coordinate: coordinate,
                  meta: {
                    prop: 'StartNoneEvent',
                    name: '开始节点'
                  }
                })
              }
            }
          },
          {
            label: '条件节点',
            disable: false,
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 80,
                height: 30,
                coordinate: coordinate,
                meta: {
                  prop: 'ExclusiveGateway',
                  name: '条件节点'
                }
              })
            }
          },
          {
            label: '审批节点',
            disable: false,
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 160,
                height: 70,
                coordinate: coordinate,
                meta: {
                  prop: 'UserTask',
                  name: '审批节点'
                }
              })
            }
          },
          {
            label: '结束节点',
            disable(graph) {
              return !!graph.nodeList.find(
                point => point.meta.prop === 'EndNoneEvent'
              )
            },
            selected: (graph, coordinate) => {
              graph.addNode({
                width: 80,
                height: 50,
                coordinate: coordinate,
                meta: {
                  prop: 'EndNoneEvent',
                  name: '结束节点'
                }
              })
            }
          }
        ]
      ],
      // 节点的右键
      nodeMenuList: [
        [
          {
            label: '删除',
            disable: false,
            hidden(node) {
              return node.meta.prop === 'StartNoneEvent'
            },
            selected(node, coordinate) {
              node.remove()
            }
          }
        ],
        [
          {
            label: '编辑',
            selected: (node, coordinate) => {
              this.drawerConf.open(drawerType.node, node)
            }
          }
        ]
      ],
      // 线条的右键
      linkMenuList: [
        [
          {
            label: '删除',
            disable: false,
            selected: (link, coordinate) => {
              link.remove()
            }
          }
        ],
        [
          {
            label: '编辑',
            disable: false,
            selected: (link, coordinate) => {
              this.drawerConf.open(drawerType.link, link)
            }
          }
        ]
      ]
    }
  },
  created() {
    console.log(this.designData)
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.scrollBy({
        left: (this.$el.scrollWidth - this.$el.clientWidth) / 2,
        top: (this.$el.scrollHeight - this.$el.clientHeight) / 2
      })
    })
  },
  methods: {
    enterIntercept(formNode, toNode, graph) {
      const formType = formNode.meta.prop
      switch (toNode.meta.prop) {
        case 'StartNoneEvent':
          return ['StartNoneEvent', 'UserTask', 'ExclusiveGateway'].includes(
            formType
          )
        // return false
        case 'UserTask':
          return ['StartNoneEvent', 'UserTask', 'ExclusiveGateway'].includes(
            formType
          )
        case 'ExclusiveGateway':
          return ['StartNoneEvent', 'UserTask', 'ExclusiveGateway'].includes(
            formType
          )
        case 'EndNoneEvent':
          return ['UserTask'].includes(formType)
        default:
          return true
      }
    },
    outputIntercept(node, graph) {
      this.doneList = graph.toJSON()
      return !(node.meta.prop === 'end')
    },
    linkDesc(link, graph) {
      console.log('link描述文字', link.graph)
      this.doneList = link.graph.toJSON()
      return link.meta ? link.meta.name : ''
    },
    // 更改节点名称与描述
    settingSubmit() {
      const conf = this.drawerConf
      if (this.drawerConf.type === drawerType.node) {
        if (!conf.info.meta) conf.info.meta = {}
        Object.keys(this.nodeSetting).forEach(key => {
          this.$set(conf.info.meta, key, this.nodeSetting[key])
        })
        this.$refs.nodeSetting.resetFields()
      } else {
        if (!conf.info.meta) conf.info.meta = {}
        Object.keys(this.linkSetting).forEach(key => {
          this.$set(conf.info.meta, key, this.linkSetting[key])
        })
        this.$refs.linkSetting.resetFields()
      }
      conf.visible = false
    },
    // disposeClk 处理数据
    async disposeClk() {
      const nodeArr = this.doneList.nodeList
      const linkArr = this.doneList.linkList
      // 整理好后台的数据格式
      let exceArr = []
      nodeArr.forEach(item => {
        item.outgoing = []
      })
      linkArr.forEach(item => {
        item.outgoing = []
      })
      // 把线条 和 节点 对应起来
      linkArr.forEach(item => {
        // 一个线条 对应一个节点
        item.outgoing.push({ resourceId: item.endId })
        nodeArr.forEach(obj => {
          // item 单条线条id obj 点个节点id 一个节点对应多条线条
          if (item.startId === obj.id) {
            obj.outgoing.push({ resourceId: item.id })
          }
        })
      })
      exceArr = this.dataPro(nodeArr, [])
      exceArr = this.dataPro(linkArr, exceArr)
      this.designData.childShapes = exceArr
      const values = {
        name: '请假流程',
        description: 'leaveProcess',
        json_xml: this.designData,
        svg_xml: ''
      }
      const bodyValues = {
        modelId: '0e4c9f41-4095-11ec-9496-00ff12992f7c',
        values: values
      }
      const { data } = await api.modelSave(bodyValues)
      console.log(data)
    },
    dataPro(Arr, exceArr) {
      Arr.forEach(item => {
        const obj = {
          ...this.nodeObj,
          ...{
            resourceId: item.id,
            properties:
              item.meta === null
                ? { name: '' }
                : { ...item.meta, ...this.nodeObj.properties },
            outgoing: item.outgoing,
            target: item.outgoing[0],
            stencil: {
              id: item.meta === null ? 'SequenceFlow' : item.meta.prop
            }
          }
        }
        exceArr.push(obj)
      })
      return exceArr
    }
  }
}
</script>
<style lang="scss" scoped>
.design {
  width: 100%;
  height: 800px;
}
.super-flow__node {
  border-radius: 8px !important;
  text-align: center;
}
.ellipsis {
  background: #2f86f6;
  border-radius: 8px;
}
.flow-node-ExclusiveGateway .ellipsis {
  background: #fff;
}
</style>
<style>
.super-flow__node {
  border-radius: 8px !important;
  text-align: center;
}
</style>
