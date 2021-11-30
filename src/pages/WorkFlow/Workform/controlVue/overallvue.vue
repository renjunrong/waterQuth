<template>
  <div class="overall-form">
    <el-form ref="componentFrom" :model="componentFrom" label-width="130px">
      <el-form-item label="控件类型：">
        {{ componentFrom.name }}
      </el-form-item>
      <el-form-item label="控件名称：">
        <el-input
          v-model="componentFrom.label"
          placeholder="最多不超过10个字"
        />
      </el-form-item>
      <!-- 变动表单 -->
      <!-- start -->
      <input-vue v-if="fromType === 'input'" :input-form="componentFrom" />
      <proposerVue
        v-else-if="fromType === 'proposer'"
        :input-form="componentFrom"
      />
      <textareaVue
        v-else-if="fromType === 'textarea'"
        :input-form="componentFrom"
      />
      <numInputVue
        v-else-if="fromType === 'numInput'"
        :input-form="componentFrom"
      />
      <uploadImgVue
        v-else-if="fromType === 'uploadImg'"
        :input-form="componentFrom"
      />
      <radioVue v-else-if="fromType === 'radio'" :input-form="componentFrom" />
      <uploadFileVue
        v-else-if="fromType === 'uploadFile'"
        :input-form="componentFrom"
      />
      <checkboxVue
        v-else-if="fromType === 'checkbox'"
        :input-form="componentFrom"
      />
      <serialNumVue
        v-else-if="fromType === 'serialNum'"
        :input-form="componentFrom"
      />
      <phoneVue v-else-if="fromType === 'phone'" :input-form="componentFrom" />
      <dateVue v-else-if="fromType === 'date'" :input-form="componentFrom" />
      <timeVue v-else-if="fromType === 'time'" :input-form="componentFrom" />
      <stepsVue v-else-if="fromType === 'steps'" :input-form="componentFrom" />
      <selectVue
        v-else-if="fromType === 'select' ||fromType === 'multSelect'"
        :input-form="componentFrom"
      />
      <tableVue
        v-else-if="fromType === 'table'"
        :input-form="componentFrom"
      />
      <!-- end -->
      <el-form-item label="是否必填：">
        <el-radio-group
          v-if="componentFrom.rules"
          v-model="componentFrom.rules[0].required"
        >
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="字段宽度：">
        <el-radio-group
          v-if="componentFrom.options"
          v-model="componentFrom.options.width"
          size="small"
          @change="widthChange"
        >
          <el-radio-button
            v-for="(item, index) in widthArr"
            :key="index"
            :label="item.breadth"
          >{{ item.label }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import inputVue from './input.vue'
import proposerVue from './proposer.vue'
import textareaVue from './textarea.vue'
import numInputVue from './numInput.vue'
import uploadImgVue from './uploadImg.vue'
import radioVue from './radio.vue'
import uploadFileVue from './uploadFile.vue'
import checkboxVue from './checkbox.vue'
import serialNumVue from './serialNum.vue'
import phoneVue from './phone.vue'
import dateVue from './date.vue'
import timeVue from './time.vue'
import stepsVue from './steps.vue'
import selectVue from './select.vue'
import tableVue from './table.vue'
export default {
  components: {
    inputVue,
    proposerVue,
    textareaVue,
    numInputVue,
    uploadImgVue,
    radioVue,
    uploadFileVue,
    checkboxVue,
    serialNumVue,
    phoneVue,
    dateVue,
    timeVue,
    stepsVue,
    selectVue,
    tableVue
  },
  props: {
    componentFrom: {
      type: Object,
      default: () => {}
    },
    fromType: String
  },
  data() {
    return {
      widthArr: [
        { breadth: '6', label: '1/4' },
        { breadth: '8', label: '1/3' },
        { breadth: '12', label: '1/2' },
        { breadth: '16', label: '2/3' },
        { breadth: '18', label: '3/4' },
        { breadth: '24', label: '整行' }
      ]
    }
  },
  mounted() {
    console.log(this.componentFrom, this.fromType)
  },
  methods: {
    widthChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.overall-form {
}
</style>
