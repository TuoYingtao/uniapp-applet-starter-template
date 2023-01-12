<template>
    <view :class="[prefix, name, block ? 'block' : 'inline-flex']" :style="{color, fontSize: mySize}" />
</template>
<script>
/**
 * 图标组件
 * 依赖	/css/tailwind.less
 * 		/css/iconfont.css
 *
 * @event tap
 * @event click
 */
export default {
    props: {
        prefix: {
            type: String,
            default: "iconfont",
        },
        // iconfont图标名
        name: {
            type: String,
            default: "",
        },
        // 颜色
        color: {
            type: String,
            default: "#333333",
        },
        // 尺寸，默认单位rpx，也可以传入字符串自定义
        size: {
            type: [String, Number],
            default: 30,
        },
        // 是否是块级元素
        block: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        mySize() {
            // 符合整数的字符串也认为是数字
            return /^\d+(\.\d+)?$/.test(this.size) ? `${this.size}rpx` : this.size;
        },
    },
};
</script>