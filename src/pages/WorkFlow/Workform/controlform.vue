<template>
  <div class="control-form">
    <h3>新建表单</h3>
    <div class="control_title">
      <el-input v-model="formName" placeholder="请输入表单名称" />
      <el-select v-model="formType" placeholder="请选择">
        <el-option
          v-for="item in formTypes"
          :key="item.val"
          :label="item.label"
          :value="item.val"
        />
      </el-select>
      <div class="handle_but">
        <el-button type="primary" @click="preview">web端预览效果</el-button>
        <el-button type="primary" @click="formSubmit">保存</el-button>
      </div>
      <div style="clear: both;" />
    </div>

    <div style="margin-top:14px;width:100%;position: relative;">
      <div class="control_left">
        <el-form :inline="true" :model="formLabelAlign" label-width="100px">
          <draggable
            v-model="myArray"
            chosen-class="chosen"
            force-fallback="true"
            group="people"
            animation="1000"
            @start="onStart"
            @end="onEnd"
          >
            <transition-group tag="el-col">
              <el-col
                v-for="(element, index) in myArray"
                :key="index"
                :span="element.options.width"
                class="algin_item"
                @click.native="componentClick(element, index)"
              >
                <i
                  class="el-icon-delete"
                  @click.stop="removeCom(element, index)"
                />
                <el-form-item :label="element.label">
                  <el-input v-if="element.type === 'input' || element.type === 'proposer'" :readonly="true" />
                  <el-input
                    v-if="element.type === 'textarea'"
                    type="textarea"
                    maxlength="30"
                    :readonly="true"
                  />
                </el-form-item>
              </el-col>
            </transition-group>
          </draggable>
        </el-form>
      </div>
      <div class="control_right">
        <h4>控件属性</h4>
        <control-form :component-from="attrForm" :from-type="attrForm.type" />
      </div>
    </div>
    <div class="control_bottom">
      <h4>基础组件</h4>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in controlData" :key="index" :span="6">
          <div class="widget">
            <span class="iconfont" :class="'icon-a-' + item.fontIcon" />
            {{ item.name }}
          </div>
          <span
            class="iconfont icon-a-tianjia font-add"
            @click="controlAdd(item,index)"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import controlForm from './controlVue/overallvue.vue'
import { controlData } from './controlVue/data/controlData.json'
import api from '@/api/workform.js'
export default {
  components: {
    draggable,
    controlForm
  },
  data() {
    return {
      drag: false,
      myArray: [], // 主题表单数组
      controlData,
      formLabelAlign: {},
      attrForm: {}, // 控件属性
      formName: '',
      formTypes: [
        { val: 1, label: '预算管理' },
        { val: 2, label: '收支管理' },
        { val: 3, label: '合同管理' },
        { val: 4, label: '在建项目管理' },
        { val: 5, label: '采购管理' },
        { val: 6, label: '资产管理' }

      ],
      formType: 1,
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id
    console.log(this.id)
  },
  methods: {
    onStart() {
      this.drag = true
    },
    onEnd() {
      this.drag = false
    },
    // 添加组件
    controlAdd(obj, index) {
      console.log(obj)
      this.attrForm = this.controlData[index]
      this.myArray.push(obj)
    },
    // preview预览效果
    preview() {
      console.log(this.myArray)
    },
    // 移除组件
    removeCom(el, index) {
      this.myArray.splice(index, 1)
    },
    // 点击组件
    componentClick(el, index) {
      console.log(el, index)
      this.attrForm = this.myArray[index]
    },
    // 表单保存
    async formSubmit() {
      const { data } = await api.AddForm({
        controlJson: JSON.stringify(this.myArray),
        formName: this.formName,
        formType: this.formType
      })
      if (data) {
        this.$message.success(data.message)
      } else {
        this.$message.error('操作失败')
      }
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.control-form {
  color: #484d5e;
  font-size: 14px;
  label {
    font-size: 12px;
  }
  h3 {
    display: inline-block;
    width: 100px;
    margin-left: 20px;
  }
  .algin_item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    .el-icon-delete {
      position: absolute;
      top: -14px;
      right: 0px;
    }
  }
  .control_title {
    margin-bottom: 30px;
    .el-input {
      float: left;
      width: 300px;
      margin-left: 40px;
    }
    .handle_but {
      float: right;
    }
  }
  .control_bottom {
    border: 1px solid #dcdfe6;
    width: 100%;
    h4 {
      width: 74px;
      height: 18px;
      background: #fff;
      margin-left: 12px;
      margin-top: -10px;
      text-align: center;
      font-size: 14px;
      color: #484d5e;
      font-weight: 400;
    }
    .widget {
      background: #ffffff;
      border: 1px solid #dcdfe6;
      padding: 6px 8px;
      display: inline-block;
      width: 80%;
      border-radius: 6px;
      color: #c0c4cc;
    }
    .el-col-6 {
      padding-left: 25px !important;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .font-add {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #2f86f6;
      border-radius: 20px;
      text-align: center;
      line-height: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
  .control_left {
    margin-right: 440px;
    border-bottom: 1px solid #dcdfe6;
    min-height: 580px;
    margin-bottom: 20px;
    width: calc(100% - 440px);
  }
  .control_right {
    border: 1px solid #dcdfe6;
    background: #fff;
    width: 410px;
    padding-top: 12px;
    padding-right: 14px;
    position: absolute;
    top: 0;
    right: 0;
    min-height: 580px;
    // float: right;
    h4 {
      width: 74px;
      height: 18px;
      background: #fff;
      margin: auto;
      margin-top: -22px;
      text-align: center;
      font-size: 14px;
      color: #484d5e;
      font-weight: 400;
    }
  }
}
</style>
<style>
.el-radio-button--small .el-radio-button__inner {
  padding: 7px 10px;
}
.control_left .el-form-item {
  width: 100%;
}
.control_left .el-form-item__content {
  width: calc(100% - 100px);
}
</style>
