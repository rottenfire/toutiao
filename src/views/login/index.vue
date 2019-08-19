<template>
  <div id="login">
    <el-card class="login-card">
      <div id="title-logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="formData" :rules="formRules" ref="loginForm">
        <el-form-item prop="cellphoneNum">
          <el-input v-model="formData.cellphoneNum" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="identifying">
          <el-input class="identifying" v-model="formData.identifying" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox class="check" v-model="formData.check">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="verification">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

  data () {
    const isAgree = (rules, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('需要同意协议才可登录'))
      }
    }
    return {
      formData: {
        cellphoneNum: '',
        identifying: '',
        check: false
      },
      formRules: {
        cellphoneNum: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[345678]\d{9}$/, message: '输入的手机号格式不正确', trigger: 'blur' }
        ],
        identifying: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' }
        ],
        check: [
          { validator: isAgree }
        ]
      }
    }
  },
  methods: {
    verification () {
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          console.log('true')
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-image: url(../../assets/img/login_bg.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-card {
    width: 400px;
    height: 350px;

    #title-logo {
      text-align: center;
      margin-bottom: 30px;

      img {
        width: 170px;
      }
    }

    .identifying {
      width: 64%;
    }
    .check {
      color: #aaa;
      a {
        color: #3296fa;
      }
    }
    .submit {
      width: 100%;
    }
  }
}
</style>
