<template>
  <div class="user-manage">
    <div class="manage_left">
      <el-tree :data="data" :props="defaultProps" default-expand-all />
    </div>
    <div class="manage_right">
      <div class="handle_top">
        <div class="handle_button">
          <el-button @click="userSetting">设置权限</el-button>
          <el-button @click="userRecycle">回收权限</el-button>
        </div>
        <div class="handle_seach">
          <label>角色</label>
          <el-select v-model="roleattr" placeholder="请选择角色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="rolename" placeholder="请输入姓名">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="Search" />
          </el-input>
        </div>
      </div>
      <div>
        <Table
          :table-data="tableData"
          :table-label="tableLabel"
          :is-select="true"
          @selectChange="selectChange"
        />
        <Pagination :total="page.total" :pagesize="page.size" />
      </div>
    </div>
    <el-dialog
      title="回收权限"
      :visible.sync="dialogRecycle"
      width="30%"
    >
      <span>确认回收该用户所有权限？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="设置权限"
      :visible.sync="dialogSetting"
      width="40%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色">
          <el-select v-model="form.visible" multiple placeholder="请选择">

            <el-option
              v-for="city in cities"
              :key="city"
              value="templateform.visible"
              class="multipleClass"
            >
              <el-checkbox :label="city">{{ city }}</el-checkbox>
              <!-- <div style="margin: 15px 0;" />
              <el-checkbox-group v-model="form.visible" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
              </el-checkbox-group> -->
            </el-option>
            <div style="text-align: center;">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">反选</el-checkbox>
            </div>

          </el-select>
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/permission'
const cityOptions = ['办公室', '局领导', '局长办公会', '党委会', '节水科', '排水所']
export default {
  data() {
    return {
      tableData: [],
      tableLabel: [
        { label: '姓名', name: 'templateName' },
        { label: '部门', name: 'templateDesc' },
        { label: '职务', name: 'createUser' },
        { label: '办公电话', name: 'createDateStr' },
        { label: '手机号', name: 'templateTypeStr' },
        { label: '直接上级', name: 'templateTypeStr' },
        { label: '系统角色', name: 'templateTypeStr' }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      data: [],
      options: [],
      roleattr: '',
      rolename: '',
      page: {
        total: 0,
        size: 1
      },
      dialogRecycle: false,
      dialogSetting: false,
      form: {
        visible: []
      },
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: false
    }
  },
  mounted() {
    this.Structure()
  },
  methods: {
    // 设置权限
    userSetting() {
      this.dialogSetting = true
    },
    // 回收权限
    userRecycle() {
      this.dialogRecycle = true
    },
    // 查询
    Search() {

    },
    selectChange(val) {
      console.log(val)
    },
    handleCheckAllChange() {

    },
    handleCheckedCitiesChange() {

    },
    // 获取组织结构
    async Structure() {
      const { data } = await api.structure()
      this.data = data
    }
  }
}
</script>
<style lang="scss" scoped>
.entirety{
  padding:0;
}
.user-manage{
  width: 100%;
  height: 100%;
  display: flex;
  .manage_left{
    flex:0 0 300px;
  }
  .manage_right{
    flex: 1;
    .handle_top{
      width: 100%;
    }
    .handle_button{
      float: left;
    }
    .handle_seach{
      float: right;
      div{
        display: inline-block;
      }
      .el-input{
        width: 240px;
      }
    }
  }
}
</style>
