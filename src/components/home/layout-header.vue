<template>
  <div>
    <el-row>
      <el-col :span="10">
        <i class="el-icon-s-unfold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col class="rightSide" :span="4">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <img :src="userAvatar ? userAvatar: defaultAvatar" alt />
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      userAvatar: '',
      defaultAvatar: require('../../assets/img/toutiao.png')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.username = result.data.name
        this.userAvatar = result.data.photo
      }).catch(err => {
        console.log(err)
      })
    },
    handleCommand (command) {
      if (command === 'userinfo') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/rottenfire/toutiao'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.el-row {
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  i {
    font-size: 18px;
  }
  .rightSide {
    float: right;
    .el-dropdown-link {
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
</style>
