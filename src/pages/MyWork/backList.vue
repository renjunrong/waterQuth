<template>
  <div class="back-list">
    <h3 class="list_title">{{ backTitle }}</h3>
    <div class="list_conent">
      <div v-for="(item,index) in backlogList" :key="index" class="line">
        <div>
          <span>[{{ item.typeTitle }}]</span>
          {{ item.title }}
        </div>
        <div>{{ item.date }}</div>
        <div class="clear" />
      </div>
    </div>
    <Pagination />
  </div>
</template>
<script>
export default {
  props: {
    backlogList: {
      type: Array,
      default: () => []
    },
    backTitle: String

  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.back-list {
  margin:14px 12px 4px 12px;
  .list_title {
    height: 30px;
    line-height: 34px;
    font-size:16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #484d5e;
    opacity: 1;
  }
  .list_conent{
     font-size: 14px;
    color: #484D5E;
    font-weight: 600;
    border-top:1px solid #C0C4CC;
    border-bottom: 1px solid  #DCDFE6;
    height: 300px;
    span{
      color: #157BD8;
    }
    .line{
      padding:3px 14px;
      border-bottom: 1px solid #C0C4CC;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      div:nth-child(1){
        float: left;
      }
       div:nth-child(2){
        float: right;
      }
    }
    .clear{
      clear: both;
    }
  }
}
</style>
