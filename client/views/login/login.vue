<template lang="html">
  <form class="login-from" @submit="onSubmit" @click = 'clearErrmsg'>
    <div class="header-bar"><h2>login</h2><span class="errmsg">{{errorMessage}}</span></div>
    <input type="text" name="username" v-model="username" value="" autocomplete="off" placeholder="username">
    <input type="password" name="password" v-model="password" value="" placeholder="password">
    <button class="login-btn">登 录</button>
    <!--<slide-block>-->
      <!--<slide>abcdefg1{{msg}}</slide>-->
      <!--<slide>abcdefg2</slide>-->
      <!--<slide>abcdefg3</slide>-->
      <!--<slide>abcdefg4</slide>-->
      <!--<slide>abcdefg5</slide>-->
    <!--</slide-block>-->
  </form>
</template>

<script>
  import model from '../../model/client-model'

  export default {
    metaInfo: {
      title: 'Login Page'
    },
    methods: {
      clearErrmsg () {
        this.errorMessage = ''
      },
      onSubmit (e) {
        e.preventDefault()
        model.login(this.username, this.password).then(() => {
          this.$notify({
            content: '登录成功!'
          })
          this.$router.push('/todo')
        }).catch(err => {
          if (err.status !== 200) {
            this.errorMessage = 'username or password error.'
          }
        })
      }
    },
    data () {
      return {
        errorMessage: '',
        username: '',
        password: ''
      }
    },
    name: 'login'
  }
</script>

<style lang="scss">
  .login-from{
    background-color:#fff;
    width:350px;
    padding:30px;
    border:solid 1px #fafafa;
    box-shadow: 0px 0px 5px #666;
    margin:0 auto;
    .header-bar{
      h2{
        display:inline-block;
        font-size:28px;
        text-transform: uppercase;
        padding:0px;
        margin:0px;
        margin-bottom:10px;
      }
      .errmsg{
        margin-left:15px;
        color:#ff0000;
      }
    }
    input {
      width:100%;
      height:40px;
      padding:5px;
      font-size:14px;
      box-sizing: border-box;
      margin-bottom : 10px;
      display:block;
    }
    .login-btn{
      width:100%;
      height:40px;
      background-color:#8214ea;
      display:block;
      color:#fff;
      font-size:20px;
      text-align: center;
      line-height:40px;
      outline: none;
      border: 0;
    }
  }
 </style>
