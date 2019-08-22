<template>
  <div>
    <div class="title">
      <img class="logo" src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu router background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="container">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publishArticle">发布文章</el-menu-item>
        <el-menu-item index="/home/containerList">内容列表</el-menu-item>
        <el-menu-item index="/home/commentList">评论列表</el-menu-item>
        <el-menu-item index="/home/materialManage">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="fans">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/visibleData">图文数据</el-menu-item>
        <el-menu-item index="/home/fansSituation">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fansModel">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fansList">粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item index="/account">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
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
</style>
