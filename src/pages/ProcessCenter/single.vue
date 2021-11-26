<template>
  <div class="single">
    <h3>
      {{ singleList.title }} <i>{{ singleList.children.length }}</i>
    </h3>
    <div class="sing_line">
      <div v-for="(item, index) in singleList.children" :key="index">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singleList: Object
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.single {
  margin: 10px 18px;
  padding-top: 10px;
  h3 {
    color: #484d5e;
    font-size: 14px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: #157bd8;
      color: #fff;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
    }
  }
  .sing_line {
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
    // padding-bottom: 20px;
    div {
      font-size: 14px;
      display: inline-block;
      width: 25%;
      text-align: center;
      color: #157bd8;
      margin-bottom: 20px;
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
