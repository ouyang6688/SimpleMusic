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
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3649178992,1821853682&fm=26&gp=0.jpg"
               alt="">
          <p><span class="iconfont icon-ren"></span>用户 {{ $store.state.user.phone }}</p>
        </li>
        <li>
          <div @click="$router.push({path:'/recommend'})"><span class="iconfont icon-tuijian1"></span>首页</div>
          <div @click="$router.push({path:'/enshrine'})"><span class="iconfont icon-shoucangjia"></span>收藏</div>
        </li>
        <li @click="delUser"><span class="iconfont icon-denglu"></span>退出登录</li>
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
  methods: {
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

.registerdiv {
  width: 100vw;
  height: 630px;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;

  ul {
    width: 80%;
    height: 40%;
    color: #616161;

    li {
      width: 100%;
      height: 54px;
      line-height: 54px;
      vertical-align: middle;
      text-align: center;

      img {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        position: absolute;
        top: -38%;
        left: 39%;
      }

      &:nth-child(2) {
        position: relative;
        margin-top: 50px;
        height: 100px;
        line-height: 120px;
        background-color: #faf7f7;
        border-radius: 50px;

        span {
          font-size: 24px;
          line-height: 100%;
          padding-right: 5px;
          color: #D4473C;
        }
      }

      &:nth-child(3) {
        margin-top: 40px;
        display: flex;
        justify-content: space-around;

        div {
          width: 45%;
          height: 100%;
          border: 1px solid #8d8e8f;
          border-radius: 40px;

          span {
            font-size: 24px;
            line-height: 100%;
            padding-right: 10px;
          }
        }
      }

      &:last-child {
        margin-top: 40px;
        border: 1px solid #8d8e8f;
        border-radius: 40px;

        span {
          font-size: 24px;
          line-height: 100%;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>