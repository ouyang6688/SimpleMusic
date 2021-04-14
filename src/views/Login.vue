<template>
  <div>
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
</template>

<script>
export default {
  name: "Login",
  data() {
    return {}
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
</style>