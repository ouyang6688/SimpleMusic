<template>
  <div>
    <div class="loadingvan" v-show="loading">
      <van-loading type="spinner" color="#D4473C" size="50px"/>
    </div>

    <ul>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <li v-for="(item,index) in toplists" :key="index" @click="goMusiclist(item.id)">
          <div class="left">
            <img :src="item.coverImgUrl" :alt="item.name">
          </div>
          <div class="right">
            <p v-for="(lid,idx) in item.getTopListsDetail" :key="idx">{{
                `${idx + 1} . ${lid.name} - ${lid.ar[0].name}`
              }}</p>
          </div>
        </li>
      </van-pull-refresh>
    </ul>
  </div>
</template>

<script>
import {getTopList, getTopListsDetail} from '../api/rank'

export default {
  name: "rank",
  data() {
    return {
      toplists: "",
      isLoading: false,
      loading: true,
    }
  },
  beforeRouteEnter(to, from, next) {
    getTopList({limit: 10}).then(data => {
      next(vm => vm.getTopListsDetailFun(data.list))
    })
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
      }, 3000)
    })
  },
  methods: {
    getTopListsDetailFun(toplistsData) {
      // console.log(toplistsData);
      this.toplists = toplistsData;
      for (let item in toplistsData) {
        getTopListsDetail({id: toplistsData[item].id}).then(data => {
          if (data.playlist.tracks.length) {
            this.$set(this.toplists[item], "getTopListsDetail", data.playlist.tracks.slice(0, 3))
            // console.log(data.playlist.tracks)
          }
        })
      }
    },
    goMusiclist(id) {
      this.$router.push({
        path: "/recommend/musiclist",
        query: {id}
      })
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  }

}
</script>

<style scoped lang="less">
ul {
  width: 100%;
  margin-top: 0.15625rem;

  li {
    width: 96%;
    margin: 0 auto;
    height: 3.8125rem;
    font-size: 0.328125rem;
    border-bottom: 3px solid #E1E2E2;
    color: #25262F;
    display: flex;

    .left {
      display: flex;
      align-items: center;

      img {
        width: 3.53125rem;
        height: 3.53125rem;
        background-color: pink;
      }
    }

    .right {
      padding-left: 0.59375rem;
      padding-top: 0.3125rem;

      p {
        height: 1.0625rem;
        line-height: 1.0625rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.loadingvan {
  position: fixed;
  z-index: 900;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background: rgba(242, 242, 242, 0.8);
  text-align: center;

  .van-loading {
    margin: 0 auto;
    margin-top: 7.0625rem;
  }
}
</style>