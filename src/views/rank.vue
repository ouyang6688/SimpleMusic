<template>
  <div>
    <ul>
      <li v-for="(item,index) in toplists" :key="index" @click="goMusiclist(item.id)">
        <div class="left">
          <img :src="item.coverImgUrl" :alt="item.name">
        </div>
        <div class="right">
          <p v-for="(lid,idx) in item.getTopListsDetail" :key="idx">{{ `${idx + 1} . ${lid.name} - ${lid.ar[0].name}` }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getTopList,getTopListsDetail} from '../api/rank'

export default {
  name: "rank",
  data() {
    return {
      toplists: "",
    }
  },
  beforeRouteEnter(to,from,next){
    getTopList({limit:10}).then(data=>{
      next(vm => vm.getTopListsDetailFun(data.list))
    })
  },
  methods:{
    getTopListsDetailFun(toplistsData){
      // console.log(toplistsData);
      this.toplists = toplistsData;
      for(let item in toplistsData){
        getTopListsDetail({id:toplistsData[item].id}).then(data=>{
          if(data.playlist.tracks.length ){
            this.$set(this.toplists[item],"getTopListsDetail",data.playlist.tracks.slice(0,3))
            // console.log(data.playlist.tracks)
          }
        })
      }
    },
    goMusiclist(id){
      this.$router.push({
        path:"/recommend/musiclist",
        query:{id}
      })
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
</style>