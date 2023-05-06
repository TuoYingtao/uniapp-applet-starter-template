<template>
  <view class="container flex flex-column justify-center items-center">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <t-button class="space-item bottom-btn" @click="toList">去{{ naiveCardPage.message }}</t-button>
  </view>
</template>

<script>
import { NaiveCardEnum } from "@/enum/GlobalEnums";
import { mapGetters } from "vuex";
import { homeApi } from "@/api/home";
const App = getApp();

export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  computed: {
    naiveCardPage() {
      const value = NaiveCardEnum.PATH_PAGE;
      return { value: value, message: NaiveCardEnum.getDescMessage(value) }
    },
    ...mapGetters(['device_info'])
  },
  methods: {
    getApiList() {
      homeApi().then(data => {
        console.log(data)
      });
    },
    toList(e) {
      this.$navigateTo({
        url: '/pages_a/list',
      })
    }
  },
  onLoad() {
    console.log('设备信息', this.device_info)
    const globalData = App.globalData;
    console.log('globalData', globalData)
    // 获取页面的实例
    let pages = getCurrentPages();
    // 这句话 获取的才是当前页面实例
    let currentPage = pages[pages.length-1];
    console.log("页面的实例", pages, currentPage)
    this.getApiList();
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/mixin.scss';

.bottom-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 98;
  width: 100%;
  box-sizing: border-box;
  padding: 15rpx 70rpx;
  display: flex;
  @include x-padding-bottom(12rpx)
}

.logo {
  height: 200rpx;
  width: 200rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
