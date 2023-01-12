<template>
    <view class="cp-t-backtop" :style="{color: style.color, background: style.background}">
        <van-icon name="back-top" size="40rpx" />
    </view>
</template>
<script>
import TIcon from "../t-icon/t-icon.vue";
export default {
    components: {TIcon},
    props: {
        theme: {
            type: String,
            validator: (val) => ["dark", "light"].includes(val),
            default: "dark",
        },
    },
    computed: {
        style() {
            return {
                color: this.theme == "dark" ? "#fff" : "#3c3c3c",
                background: this.theme == "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)",
            };
        },
    },
};
</script>
<style scoped lang="less">
.cp-t-backtop {
    position: fixed;
    width: 80rpx;
    height: 80rpx;
    right: 30rpx;
    bottom: 40rpx;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 999rpx;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}
</style>