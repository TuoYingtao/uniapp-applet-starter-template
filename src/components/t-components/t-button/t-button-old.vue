<template>
	<button class="cp-t-button text-center leading-tight" :class="{
            'text-sm': !pure && size == 'small',
            'text-base': !pure && size == 'default',
            'text-lg': !pure && size == 'large',
            'text-xl': !pure && size == 'xlarge',

            'px-4': !pure && size == 'small',
            'py-2': !pure && size == 'small',
            'px-6': !pure && size == 'default',
            'py-2': !pure && size == 'default',
            'px-7': !pure && size == 'large',
            'py-2': !pure && size == 'large',
            'px-10': !pure && size == 'xlarge',
            'py-3': !pure && size == 'xlarge',

            disabled: disabled,
            loading: loading,
        }" :style="{
            backgroundColor: style.backgroundColor,
            color: style.color,
            borderRadius: borderRadius,
            border: style.border,
            display: style.display,
        }" :open-type="openType" :hover-class="hoverClass ? hoverClass : 'actived'" @tap.stop="
            (e) => {
                if (!disabled && !loading) $emit('tap', e);
            }
        " @click.stop="
            (e) => {
                if (!disabled && !loading) $emit('click', e);
            }
        " @getuserinfo="$emit('getuserinfo', $event)" @getphonenumber="$emit('getphonenumber', $event)"
		@opensetting="$emit('opensetting', $event)" @launchapp="$emit('launchapp', $event)"
		@error="$emit('error', $event)">
		<slot v-if="!loading"></slot>
		<slot v-else name="loading">
			<view class="flex items-center">
				<u-loading-icon mode="semicircle" :color="plain ? color : textColor" :size="loadingSize">
				</u-loading-icon>
				<view v-if="loadingText" class="ml-1">{{ loadingText }}</view>
			</view>
		</slot>
	</button>
</template>
<script>
	/**
	 * ==== Button组件 ====
	 * 依赖 tailwindcss
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
			// 尺寸
			size: {
				type: String,
				validator: (val) => ["small", "default", "large", "xlarge"].includes(val),
				default: "default",
			},
			// 主色
			color: {
				type: String,
				default: "#007aff",
			},
			// 文字颜色
			textColor: {
				type: String,
				default: "#fff",
			},
			// 镂空，镂空以后主色和文字颜色反转
			plain: {
				type: Boolean,
				default: false,
			},
			// 圆角
			borderRadius: {
				type: String,
				default: "9999rpx",
			},
			// 块级元素
			block: {
				type: Boolean,
				default: false,
			},
			// 加载中
			loading: {
				type: Boolean,
				default: false,
			},
			// 禁用
			disabled: {
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
			},
			// 激活状态class name
			hoverClass: {
				type: String,
				default: "",
			},
			// 纯净按钮（不含任何样式，类似一个view），通常用于做open-type功能
			pure: {
				type: Boolean,
				default: false,
			},
			// 纯净模式下直接写在button上的样式
			pureStyle: {
				type: Object,
				default: () => ({}),
			},
			// 加载中文字
			loadingText: [String, Number],
		},
		computed: {
			style() {
				if (this.pure) return this.pureStyle;
				const backgroundColor = this.plain ? this.textColor : this.color;
				const color = this.plain ? this.color : this.textColor;
				const border = this.plain ? `2rpx solid ${this.color}` : `2rpx solid ${this.color}`;
				const display = this.block ? "block" : "inline-flex";
				return {
					backgroundColor,
					color,
					border,
					display
				};
			},
			loadingSize() {
				if (this.size == "small") return "32rpx";
				else if (this.size == "large") return "47rpx";
				return "37rpx";
			},
		},
	};
</script>
<style lang="scss">
	.cp-t-button {
		box-sizing: border-box;

		&.disabled {
			opacity: 0.5;
		}

		&:not(.disabled):not(.loading).actived {
			opacity: 0.8;
		}

		// 移除button默认样式
		&::after {
			border: none;
		}
	}

	.leading-tight {
		line-height: 1.25;
	}

	.text-center {
		text-align: center;
	}

	.text-sm {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.text-base {
		font-size: 1rem;
		line-height: 1.5rem;
	}

	.text-lg {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	.text-xl {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}

	.px-4 {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.px-6 {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	.px-7 {
		padding-left: 1.75rem;
		padding-right: 1.75rem;
	}

	.px-10 {
		padding-left: 2.5rem;
		padding-right: 2.5rem;
	}

	.py-2 {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.py-3 {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}
</style>
