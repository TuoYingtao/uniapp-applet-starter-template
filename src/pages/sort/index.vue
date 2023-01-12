<template>
  <view class="container">
    <navigation-bar-title class="navigation-bar-title" @toBack="toBack" @confirm="searchConfirm" />
    <view class="content flex justify-center items-center">我是分类</view>
  </view>
</template>

<script>
import NavigationBarTitle from "@/pages/sort/components/NavigationBarTitle";

export default {
  name: "index",
  components: {
    NavigationBarTitle
  },
  methods: {
    toBack(e) {

    },
    searchConfirm(e) {

    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 176rpx);
}
</style>
