<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content">
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <TabControl class="tab-control" :titles="['流行','新款','精选']" @tab-click="tabClick"></TabControl>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./chilildComps/HomeSwiper";
  import RecommendView from "./chilildComps/RecommendView";
  import FeatureView from "./chilildComps/FeatureView";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";
  import {getHomeMultidata,getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components:{
        RecommendView,
        HomeSwiper,
        NavBar,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
    },
    data(){
      return{
          result:null,
          banners:[],
          recommends:[],
          goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},
          },
          currentType:'pop'
      }
    }  ,
    created() {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
      computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
      },
      methods:{
        tabClick(index){
            // console.log(index)
            switch (index) {
                case 0:this.currentType='pop';break;
                case 1:this.currentType='new';break;
                case 2:this.currentType='sell';break;
            }
        },
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                    // console.log(res)
                    this.result=res;
                    this.banners = res.data.data.banner.list;
                    this.recommends = res.data.data.recommend.list;
                }
            )
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
                // console.log(res)
                this.goods[type].list.push(...res.data.data.list)
                this.goods[type].page+=1
            })
        }
      }
  }
</script>

<style scoped>

  #home{
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    height:calc(100% - 98px);
    /*overflow: hidden;*/
  }
</style>
