<template>
  <div class="enshrine">
    <div class="gounone">
      <span class="iconfont icon-huidingbu" @click="retop"></span>
      <span class="iconfont icon-tuichu" @click="$router.push({path:'/recommend'})"></span>
    </div>
    <div class="registerdiv">
      <ul>
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3649178992,1821853682&fm=26&gp=0.jpg"
               alt="">
          <p><span class="iconfont icon-shoucangjia1"></span>我的收藏</p>
        </li>
      </ul>
    </div>
    <dl class="musiclist">
      <dt>
        播放全部 <span>(共{{ collect.length }}首)</span>
      </dt>
      <dd v-for="(item,index) in collect" :key="index" @click="addlists(index)">
        <h1>{{ index + 1 }}</h1>
        <div class="info">
          <h2>{{ item.musicName }}</h2>
          <h3>
            <span v-for="(key,index) in item.musicSonger.ar" :key="index" v-show="index < 3">{{
                key.name
              }} &nbsp;&nbsp;</span>
          </h3>
        </div>
      </dd>
    </dl>

    <!--  播放控件  -->
    <player v-show="flag"></player>
  </div>
</template>

<script>
import {mapState} from "vuex"
import player from "../components/player";

export default {
  name: "enshrine",
  data() {
    return {
      flag: false
    }
  },
  computed: {
    ...mapState(['collect'])
  },
  methods: {
    retop() {
      window.scrollTo(0, 0);
    },
    addlists(i) {
      this.flag = true
      let listdata = [];
      this.collect.forEach(item => {
        listdata.push(item.musicSonger)
      })
      this.$store.dispatch("addmusicData", {index: i, list: listdata})
    }
  },
  components: {
    player
  }
}
</script>

<style scoped lang="less">
.enshrine {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}

.gounone {
  position: fixed;
  right: 10px;
  bottom: 40px;
  width: 40px;
  height: 80px;
  z-index: 100;

  span {
    width: 100%;
    height: 50%;
    display: block;
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    color: #8d8e8f;
    border: 1px solid black;
    border-radius: 50%;
    margin-top: 10px;
  }
}

.registerdiv {
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  margin-bottom: 20px;

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

      &:nth-child(1) {
        position: relative;
        margin-top: 30px;
        height: 70px;
        line-height: 90px;
        background-color: #faf7f7;
        border-radius: 50px;

        span {
          font-size: 24px;
          line-height: 100%;
          padding-right: 5px;
          color: #D4473C;
        }
      }
    }
  }
}

.musiclist {
  border-radius: 12px;
  background-color: #f0f0f0;
  position: relative;
  top: -12px;
  min-height: 3.125rem;

  dt {
    height: 0.953125rem;
    line-height: 0.953125rem;
    border-bottom: 1px solid #E2E2E2;
    font-size: 0.390625rem;
    color: #131615;
    text-indent: 1em;

    span {
      font-size: 0.359375rem;
      color: #616262;
    }
  }

  dd {
    width: 90%;
    margin: 0 auto;
    height: 1.421875rem;
    border-bottom: 1px solid #E2E2E2;
    display: flex;

    h1 {
      flex: 0 0 1.21875rem;
      line-height: 1.421875rem;
      text-align: center;
      font-size: 0.4375rem;
      color: #707271;
      font-weight: normal;
    }

    .info {
      flex: 1;

      h2 {
        font-size: 0.390625rem;
        color: #3A3C3C;
        margin-top: 0.28125rem;
        font-weight: normal;
      }

      h3 {
        font-size: 0.3125rem;
        color: #777978;
        font-weight: normal;
      }
    }
  }
}
</style>