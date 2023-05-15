<template>
  <div>
    <drag-list
        class="drag-list"
        sort-key="sort"
        :list="brandList"
        :itemHeight="100"
        @change="sortChange">
      <template slot-scope="{ item }">
        <view class="drag-item">
          <view class="sort-item flex justify-between items-center">
            <view class="sort-num text">{{ item.title }}</view>
            <van-icon name="wap-nav" size="20" />
          </view>
        </view>
      </template>
    </drag-list>
  </div>
</template>

<script>
import dragList from "@/components/drag/drag-list.vue"
export default {
  name: "demo",
  component: {
    dragList
  },
  data() {
    return {
      brandList: [{
        sort: 0,
        title: 'sort1'
      }, {
        sort: 0,
        title: 'sort2'
      }, {
        sort: 0,
        title: 'sort3'
      },]
    }
  },
  methods: {
    // 排序后的值
    sortChange(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
