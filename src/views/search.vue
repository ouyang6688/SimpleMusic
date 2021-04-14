<template>
  <div>
    <div class="topheader">
      <div class="button">
        <span class="iconfont icon-icon-arrow-left2" @click="$router.go(-1)"></span>
        <input type="text" placeholder="搜索歌曲、歌手" v-model="sskVlaue" @keyup.enter="addList"/>
        <span class="iconfont icon-cha delinp" v-show="sskVlaue" @click="sskVlaue=''"></span>
      </div>
    </div>
    <div class="cont" v-if="!sskVlaue">
      <div class="hot">
        <div class="top">
          <span class="title">热门搜索</span>
        </div>
        <div class="bottom">
          <span v-for="(item,index) in listHot" :key="index" @click="sskHot(item.first)">{{ item.first }}</span>
        </div>
      </div>
      <div class="history">
        <div class="top">
          <span class="title">历史记录</span>
          <span class="iconfont icon-shanchu" @click="delAllList"></span>
        </div>
        <div class="bottom">
          <ul>
            <li v-for="(item,index) in historySearch" :key="index">
              <span @click="sskHot(item)">{{ item }}</span>
              <span class="iconfont icon-close-circle" @click="delList(index)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="serList" v-else>
      <dl class="result">
        <dd class="title" v-show="listZj || listGs">
          最佳匹配
        </dd>
        <dd class="singer">
          <div class="img">
            <img :src="listGs.img1v1Url" alt=""/>
          </div>
          <div class="name">歌手：{{ listGs.name }}</div>
        </dd>
        <dd class="playlist">
          <div class="img">
            <img :src="listZj.coverImgUrl" alt=""/>
          </div>
          <div class="name">歌单：{{ listZj.name }}</div>
        </dd>
        <dd v-for="(item, index) in listDq" :key="index">
          <div class="songname">{{ item.name }}</div>
          <div class="songart">
          <span v-for="(val, key) in item.artists" :key="key"
          >{{ val.name }}&nbsp;&nbsp;</span
          >
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import {getSearchHot, getSearchArr} from "../api/search"
import {mapState, mapActions} from "vuex"

export default {
  name: "search",
  data() {
    return {
      sskVlaue: "",
      listHot: [],
      ListArr: [],
      listGs: "",
      listZj: "",
      listDq: "",
    }
  },
  computed: {
    ...mapState(['historySearch'])
  },
  methods: {
    getSearchHotFun() {
      getSearchHot().then(data => {
        this.listHot = data.result.hots
        // console.log(this.listHot)
      })
    },
    ...mapActions(['addhistory', 'delhistory', 'delallhistory']),
    addList() {
      this.ss()
      this.addhistory(this.sskVlaue)
      // this.ListArr.push(this.sskVlaue)
      // this.ListArr = this.sxVlaue(this.ListArr)
    },
    delList(i) {
      this.delhistory(i)
      // this.ListArr.splice(i, 1)
    },
    delAllList() {
      // this.ListArr.splice(0)
      this.delallhistory()
    },
    sskHot(e) {
      this.sskVlaue = e;
      this.ss()
      // this.ListArr.push(this.sskVlaue)
      // this.ListArr = this.sxVlaue(this.ListArr)
      this.addhistory(this.sskVlaue)
    },
    ss() {
      getSearchArr({
        keywords: this.sskVlaue,
        type: 1
      }).then(data => {
        this.listDq = data.result.songs
        // console.log(this.listDq)
      })
      getSearchArr({
        keywords: this.sskVlaue,
        limit: 1,
        type: 100
      }).then(data => {
        this.listGs = data.result.artists[0]
        // console.log("歌手"+this.listGs)
        console.log(this.listGs)
      })
      getSearchArr({
        keywords: this.sskVlaue,
        limit: 1,
        type: 1000
      }).then(data => {
        this.listZj = data.result.playlists[0]
        // console.log("专辑"+this.listZj)
      })
    },
    // sxVlaue: function (data){
    //   return  Array.from(new Set(data.reverse()))
    // }
  },
  created() {
    this.getSearchHotFun()
  },

}
</script>

<style lang="less" scoped>
input {
  border: none;
  outline: none;
}

.topheader {
  width: 100%;
  height: 1.078125rem;
  padding-right: 0.9375rem;
  box-sizing: border-box;
  background: #d4473c;

  .button {
    display: flex;

    .icon-icon-arrow-left2 {
      display: block;
      flex: 0 0 1.0625rem;
      height: 1.0625rem;
      line-height: 1.0625rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-size: 0.40625rem;
    }

    input {
      height: 0.546875rem;
      line-height: 0.546875rem;
      flex: 1;
      border-bottom: 1px solid #fff;
      background: transparent;
      display: block;
      margin-top: 0.265625rem;
      color: #fff;
      font-size: 0.40625rem;
    }

    input::-webkit-input-placeholder {
      color: #efb7b4;
      font-size: 0.375rem;
    }

    span.delinp {
      display: block;
      height: 1.0625rem;
      line-height: 1.0625rem;
      color: #fff;
    }
  }
}

.cont {
  margin: 0 auto;
  width: 90%;

  .hot {
    margin-top: 0.46875rem;

    .bottom {
      margin-top: 0.3125rem;

      span {
        border-radius: 0.15625rem;
        display: inline-block;
        padding: 0.15625rem;
        color: #3c3e3e;
        border: 2px solid #dcdddd;
        margin-right: 0.1875rem;
        margin-bottom: 0.1875rem;
        font-size: 0.46875rem;
      }
    }
  }

  .history {
    margin-top: 0.3125rem;

    .bottom {
      ul li {
        display: flex;
        margin-top: 0.46875rem;

        span {
          flex: 1;
        }

        .iconfont {
          flex: 0 0 0.46875rem;
        }
      }
    }
  }

  .top {
    display: flex;

    span {
      display: block;
      font-size: 0.3125rem;
      color: #8d8e8f;
    }

    .title {
      flex: 1;
    }

    .iconfont {
      display: block;
      flex: 0 0 0.46875rem;
    }
  }
}

.result {
  width: 100%;

  dd {
    padding: 0.21875rem 0.46875rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.34375rem;
    color: #2e2f30;
    border-bottom: 1px solid #e1e1e1;
    height: 1.34375rem;

    div {
      height: 0.46875rem;
      line-height: 0.46875rem;
    }

    .songart {
      font-size: 0.25rem;
      color: #636464;
    }
  }

  .title {
    height: 0.625rem;
    font-size: 0.265625rem;
    color: #d5544b;
    border: none;
  }

  .singer,
  .playlist {
    padding: 0.15625rem 0.46875rem;
    height: 1.5625rem;
    display: flex;
    align-content: center;

    .name {
      height: 1.234375rem;
      line-height: 1.234375rem;
      font-size: 0.34375rem;
    }
  }

  .img {
    width: 1.234375rem;
    height: 1.234375rem;
    background: aqua;
    margin-right: 0.34375rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>