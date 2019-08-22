<template>
  <div>
    <el-container>
      <el-aside class="layout-aside" style="width:200px">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main style="background-color: #f2f3f5;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-aside {
  min-height: 100vh;
  background-color: #323745;
  .title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: #2e2f32;
    .logo {
      width: 100px;
      vertical-align: middle;
    }
  }
}
</style>
