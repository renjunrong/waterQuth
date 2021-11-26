<template>
  <div class="nav-bar">
    <div class="nav_logo">
      <h1>海淀区水务大脑</h1>
    </div>
    <div class="nav_user">
      <div>
        <i class="el-icon-edit" />
        <span>首页</span>
      </div>
      <div>
        <i class="el-icon-user-solid" />
        <span>陈冠希</span>
      </div>
    </div>
    <div class="clear" />
  </div>
</template>

<script>
/**
@description:头部导航
@createTime:2021-11-01
@create:rjr
*/
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.nav-bar{
    width: 100%;
    height: 50px;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 0px;
    line-height: 50px;

    .nav_logo{
        float: left;
        font-size: 16px;
        margin-left: 16px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        line-height: 0px;
        color: #157BD8;
        opacity: 1;
    }
    .nav_user{
        float: right;
        font-size: 14px;
        font-family: Microsoft YaHei;
        div{
            display: inline-block;
            margin-right: 18px;
        }
        i{
            margin-right: 6px;
        }
        span{
            font-weight: 400;
            line-height: 0px;
            color: #484D5E;
            opacity: 1;
        }
    }
    .clear{
        clear: both;
    }
}
</style>
