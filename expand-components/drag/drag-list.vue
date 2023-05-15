<template>
  <view class="drag-box">
    <scroll-view class="scroll-view" :scroll-y="!isDrag">
      <view
        v-for="(item, index) in dataList"
        :key="index"
        :style="{ top: item.top + 'px', height: itemHeight - 1 + 'rpx' }"
        class="drag-item"
        :class="{ 'drag-active': item.isActive, 'drag-item-transition': isTransition }"
        @longtap="longtap(item)"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend(item)">
        <slot :item="item"></slot>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    // List数据
    list: {
      type: Array,
      default: () => []
    },
    // item项的高度
    itemHeight: {
      type: [Number],
      default: 70
    },
    // 排序字段 Key
    sortKey: [String]
  },
  data() {
    return {
      longtapTimeout: null,
      isLongtap: false, // 长按时间是否满足
      isTransition: true,
      isDrag: false,
      activeItem: null,
      dragTargetY: 0,
      dataList: [],
      sortIndexList: []
    }
  },
  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(list) {
        this.setList(list)
      }
    }
  },
  methods: {
    /**
     * 初始化数据结构
     */
    setList(list) {
      return new Promise(resolve => {
        this.dataList = list.map((item, index) => {
          this.sortIndexList.push(index)
          return {
            ...item,
            isActive: false,
            top: index * this.rowHeight,
            index: index
          }
        })
        resolve(true)
      })
    },
    /**
     * 触摸事件开始
     */
    touchstart(e) {
      // 记录当前Y值
      this.dragTargetY = e.touches[0].pageY
    },
    /**
     * 长按事件
     */
    longtap(item) {
      this.longtapTimeout = setTimeout(() => {
        this.activeItem = item
        this.isDrag = true
        item.isActive = true
        this.isLongtap = true
        clearTimeout(this.longtapTimeout)
      }, 400)
    },
    /**
     * 触摸滑动
     */
    touchmove(e) {
      if (!this.isDrag) return
      // 获取当前滑动的Y值
      let newY = e.touches[0].pageY
      // 计算触摸开始与滑动的Y值差
      let d = newY - this.dragTargetY
      // 将计算后得到的Y值差与item项的top相加
      this.activeItem.top += d
      // 获取上下文元素的索引值
      let prevIndex = this.sortIndexList[this.activeItem.index] - 1
      let nextIndex = this.sortIndexList[this.activeItem.index] + 1
      // 判断上文元素索引值是大于 0 且滑动Y值差小于 0
      if (prevIndex >= 0 && d < 0) {
        // 获取上文元素项
        let item = this.getItemByIndex(prevIndex)
        // 判断选中的元素 top 是否小于上文元素的 top
        if (this.activeItem.top < item.top) {
          // 元素互换
          this.swapArray(item)
        }
        // 判断下文元素索引值小于 list 总长度且滑动Y值差大于 0
      } else if (nextIndex < this.list.length && d > 0) {
        // 获取下文元素项
        let item = this.getItemByIndex(nextIndex)
        // 判断选中的元素 top 是否大于上文元素的 top
        if (this.activeItem.top > item.top) {
          // 元素互换
          this.swapArray(item)
        }
      }
      // 保持原位
      this.dragTargetY = newY
    },
    /**
     * 获取索引等于 index 的元素；没有则返回 null
     */
    getItemByIndex(index) {
      for (let i = 0; i < this.sortIndexList.length; i++) {
        if (this.sortIndexList[i] === index) {
          return this.dataList[i]
        }
      }
      return null
    },
    /**
     * 结束触摸
     */
    touchend(item) {
      if (!this.isLongtap) return clearTimeout(this.longtapTimeout)
      if (!this.isDrag) return
      this.isDrag = false
      this.isLongtap = false
      item.isActive = false
      // 设置选中元素的行高
      this.activeItem.top = this.sortIndexList[this.activeItem.index] * this.rowHeight
      let sortList = []
      Array(this.dataList.length)
        .fill(0)
        .forEach((v, index) => {
          // 复制对象
          let tempObj = this.deepClone(this.getItemByIndex(index))
          delete tempObj.isActive
          delete tempObj.top
          delete tempObj.index
          sortList.push(tempObj)
        })
      sortList.map((item, index) => {
        if (this.sortKey && this.sortKey != '') {
          item[this.sortKey] = index + 1
        }
        return item
      })
      this.$emit('change', sortList)
      this.reinitialize(sortList)
    },
    /**
     * 列表中两个元素交换位置
     */
    swapArray(item) {
      // 记录获取选中元素的索引
      let index = this.sortIndexList[this.activeItem.index]
      // 将需要替换的元素索引 赋值给选中元素的索引
      this.sortIndexList[this.activeItem.index] = this.sortIndexList[item.index]
      // 将选中元素的索引 index 赋值给替换元素的索引
      this.sortIndexList[item.index] = index
      // 重新计算替换元素 top 值
      item.top = index * this.rowHeight
      this.count = 0
    },
    /**
     * copy 对象
     */
    deepClone(obj) {
      let isClass = o => {
        if (o === null) return 'Null'
        if (o === undefined) return 'Undefined'
        return Object.prototype.toString.call(o).slice(8, -1)
      }
      let result = {},
        oClass = isClass(obj)
      for (let key in obj) {
        let copy = obj[key]
        if (isClass(copy) == 'Object') {
          result[key] = arguments.callee(copy)
        } else if (isClass(copy) == 'Array') {
          result[key] = arguments.callee(copy)
        } else {
          result[key] = obj[key]
        }
      }
      return result
    },
    reinitialize(list) {
      let timeout = setTimeout(async () => {
        this.isTransition = false
        let init = () => {
          return new Promise(async resolve => {
            this.sortIndexList = []
            await this.setList(list)
            resolve(true)
          })
        }
        let isFlog = await init()
        isFlog && (this.isTransition = true)
        clearTimeout(timeout)
      }, 300)
    }
  },
  computed: {
    /**
     * 计算行高
     */
    rowHeight() {
      const res = uni.getSystemInfoSync()
      let screenWidth = res.screenWidth
      if (this.itemHeight) {
        return (this.itemHeight * screenWidth) / 750
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-box {
  position: relative;

  .drag-item {
    position: absolute;
    z-index: 1;
    width: 100%;
    background-color: var(--container-background);
    border-bottom: 1rpx solid #f5f5f5;
  }

  .drag-item-transition {
    transition: all 0;
  }
}
.drag-active {
  box-shadow: 0 8px 20px 0 #e6e6e6;
  transform: scale(1.1);
  z-index: 9 !important;
  transition: box-shadow 0.2s, transform 0.2s, top 0s !important;
}
</style>
