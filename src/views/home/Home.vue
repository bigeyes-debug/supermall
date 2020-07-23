<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./chilildComps/HomeSwiper";
  import RecommendView from "./chilildComps/RecommendView";
  import {getHomeMultidata} from "../../network/home";
  export default {
    name: "Home",
    components:{
        RecommendView,
        HomeSwiper,
        NavBar,
        HomeSwiper,
    },
    data(){
      return{
          result:null,
          banners:[],
          recommends:[],
      }
    }  ,
    created() {
        getHomeMultidata().then(res=>{
            console.log(res)
            this.result=res;
            this.banners = res.data.data.banner.list;
            this.recommends = res.data.data.recommend.list;
            }
        )
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
