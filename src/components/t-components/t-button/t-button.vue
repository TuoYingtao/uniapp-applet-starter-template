<template>
	<view class="t-button-container" :style="{ width, height }">
		<button class="cp-t-button"
			:class="{ disabled: disabled, loading: loading }"
			:style="{
				padding: style.padding,
				fontSize: style.size,
				background: style.background,
				color: style.color,
				borderRadius: radius,
				border: style.border,
				display: style.display,
			}"
			:open-type="openType"
			:hover-class="hoverClass ? hoverClass : 'actived'"
			@tap.stop="(e) => {if (!disabled && !loading) $emit('tap', e);}"
			@click.stop="(e) => {if (!disabled && !loading) $emit('click', e);}"
			@getuserinfo="$emit('getuserinfo', $event)"
			@getphonenumber="$emit('getphonenumber', $event)"
			@opensetting="$emit('opensetting', $event)"
			@launchapp="$emit('launchapp', $event)"
			@error="$emit('error', $event)"
			>
				<slot v-if="!loading"></slot>
				<slot v-else name="loading">
					<view class="flex items-center">
						<u-loading-icon mode="semicircle"
							:color="plain ? color : textColor"
							:size="loadingSize"></u-loading-icon>
						<view v-if="loadingText">{{ loadingText }}</view>
					</view>
				</slot>
			</button>
	</view>
</template>

<script lang="js">
	/**
	 * ==== Button组件 ====
	 *
	 * @event tap
	 * @event click
	 * @event getuserinfo 当open-type为 getUserInfo 时触发
	 * @event getphonenumber 当open-type为 getPhoneNumber 时触发
	 * @event opensetting 当open-type为 openSetting 时触发
	 * @event launchapp 当open-type为 launchApp 时触发
	 * @event error 当open-type错误时触发
	 */
	export default {
		props: {
			// 主色
			color: {
				type: String,
				default: "#007aff",
			},
			// 激活状态class name
			hoverClass: {
				type: String,
				default: "",
			},
			// 文字颜色
			textColor: {
				type: String,
				default: "#fff",
			},
			// 文字大小
			size: [String, Number],
			// 边框线
			border: {
				type: [String],
				default: "",
			},
			// 圆角
			radius: {
				type: String,
				default: "10rpx",
			},
			// 宽度
			width: {
				type: String,
				default: "100%",
			},
			// 高度
			height: {
				type: String,
				default: "100%",
			},
			// 上下边距
			paddingTB: {
				type: String,
				default: "0rpx",
			},
			// 左右边距
			paddingLR: {
				type: String,
				default: "0rpx",
			},
			// 镂空，镂空以后主色和文字颜色反转
			plain: {
				type: Boolean,
				default: false,
			},
			// 块级元素
			block: {
				type: Boolean,
				default: false,
			},
			// 自定义样式
			customStyle: {
				type: Object,
				default: () => ({}),
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false,
			},
			// 加载中
			loading: {
				type: Boolean,
				default: false,
			},
			// 加载中文字或数字
			loadingTxt: [String, Number],
			// 纯净按钮（不含任何样式，类似一个view），通常用于做open-type功能
			pure: {
				type: Boolean,
				default: false,
			},
			// 同button的open-type
			openType: {
				type: String,
				validator: (val) => ["", "feedback", "share", "getUserInfo", "contact", "getPhoneNumber", "launchApp",
					"openSetting"
				].includes(val),
				default: "",
			}
		},
		computed: {
			style() {
				if (this.pure) return this.customStyle;
				const padding = `${this.paddingTB ? this.paddingTB : '0rpx'} ${this.paddingTB ? this.paddingTB : '0rpx'}`;
				const size = `${this.size ? this.size : 22}rpx`;
				const background = this.plain ? this.textColor : this.color;
				let border = "";
				if (this.border != "") {
					border = this.border;
				} else {
					border = this.plain ? `2rpx solid ${this.color}` : `2rpx solid ${this.textColor}`;
				}
				const color = this.plain ? this.color : this.textColor;
				const display = this.block ? "block" : "inline-flex";
				return {
					padding,
					size,
					background,
					color,
					border,
					display
				}
			},
			loadingSize() {
				return '37rpx';
			}
		},
	}
</script>

<style lang="scss">
	.t-button-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cp-t-button {
		box-sizing: border-box;
		width: 100%;
	 	height: 100%;

		&.disabled {
			opacity: 0.5;
		}

		&:not(.disabled):not(.loading).actived {
			opacity: 0.8;
		}

		// 移除button默认样式
		&::after {
			border: none;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
	}
</style>
