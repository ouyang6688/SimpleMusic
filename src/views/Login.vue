<template>
  <div>
    <div v-if="!$store.state.user.login">
      <div class="btns">
        <div :class="[$route.path === '/login/register' ? 'col' : '']">
          <router-link to="/login/register">登录</router-link>
        </div>
        <div :class="[$route.path === '/login/ringup' ? 'col' : '']">
          <router-link to="/login/ringup">注册</router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <div class="registerdiv" v-else>
      <ul>
        <li>极简音乐</li>
        <li></li>
        <li>用户 {{$store.state.user.phone}}</li>
        <li></li>
        <li @click="delUser">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  name: "Login",
  data() {
    return {}
  },
  methods:{
    ...mapActions(['delUser'])
  }
}
</script>

<style scoped lang="less">
.btns {
  margin: 20px 0;
  display: flex;
  justify-content: space-around;

  div {
    width: 40%;
    height: 0.78125rem;
    line-height: 0.78125rem;
    font-size: 0.46875rem;
    font-weight: bold;
    text-align: center;
    color: #fff;
    border: 2px solid #ffc0cb;
  }

  .col {
    background-color: #D4473C;
    color: #fff;
  }
}
.registerdiv{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ul{
    width: 60%;
    height: 40%;
    li{
      width: 100%;
      height: 20%;
      line-height: 54px;
      vertical-align: middle;
      text-align: center;
      &:nth-child(even){
        border-top: 1px solid #8d8e8f;
        border-bottom: 1px solid #8d8e8f;
      }
    }
  }
}
</style>