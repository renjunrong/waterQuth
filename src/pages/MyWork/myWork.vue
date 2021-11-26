<template>
  <div class="my-work">
    <div class="workstat">
      <div>
        <h3>待办事项</h3>
        <span>3</span>
      </div>
      <div>
        <h3>待办事项</h3>
        <span>3</span>
      </div>
      <div>
        <h3>待办事项</h3>
        <span>3</span>
      </div>
      <div>
        <h3>待办事项</h3>
        <span>3</span>
      </div>
    </div>
    <back-list :backlog-list="backlogList" :back-title="backTitle" />
  </div>
</template>

<script>
import backList from './backList'
export default {
  components: {
    backList
  },
  data() {
    return {
      backlogList: [
        { typeTitle: '收支管理', title: ' 海淀区水务局用款申请单', type: 1, date: '2021-11-03' },
        { typeTitle: '收支管理', title: ' 海淀区水务局用款申请单', type: 1, date: '2021-11-03' },
        { typeTitle: '收支管理', title: ' 海淀区水务局用款申请单', type: 1, date: '2021-11-03' }
      ],
      backTitle: '待办事项'

    }
  }
}
</script>
<style lang="scss" scoped>
.my-work {
  width: 100%;
  height: 100%;
  // background: #fff;
  // border-radius: 5px;
  // margin-top: 12px;
  .workstat {
    width: 100%;
    height: 180px;
    cursor: pointer;
    div {
      width: 22.6%;
      height: 180px;
      display: inline-block;
      margin: 1%;
      opacity: 0.8;
      text-align: center;
      color: #fff;
      span {
        font-size: 32px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 0px;
        color: #ffffff;
        opacity: 1;
      }
    }
    div:nth-child(1){
      background:#1888E8;
    }
    div:nth-child(2){
      background: #FDB31F;
    }
    div:nth-child(3){
      background: #36BC62;
    }
    div:nth-child(4){
      background: #FF5257 ;
    }
  }
}
</style>
