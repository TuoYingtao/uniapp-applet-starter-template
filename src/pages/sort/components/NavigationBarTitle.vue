<template>
	<view id="header-bar" class="header-bar">
		<view class="bar-title">
			<!-- 这里是状态栏 -->
			<view class="status_bar"></view>
			<!-- 页面搜索框占位 -->
			<view class="search-container" :style="{height: style.height, marginTop: style.marginTop}">
				<view class="search-content flex justify-start items-center">
					<view class="u-icon">
						<u-icon name="arrow-left" size="22" :bold="true" @click="$emit('toBack', e)"></u-icon>
					</view>
					<view class="search-item" @click="$emit('confirm')">
						<u-input :readonly="true" placeholder="搜索品牌/型号" prefixIcon="search" prefixIconStyle="width: 70%;font-size: 22px;color: #979797"
							border="none" :customStyle="styleInput"></u-input>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: "NavigationBarTitle",
		data() {
			return {
				statusBarHeight: 0,
			}
		},
		computed: {
			...mapGetters(['menu_button_bounding']),
			style() {
				return {
					marginTop: `${this.menu_button_bounding.top}rpx`,
					height: `${this.menu_button_bounding.height + 27}rpx`,
				}
			},
			styleInput() {
				return {
					height: "64rpx",
					padding: 0,
					background: "#F8F8F8",
					paddingLeft: "20rpx",
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.header-bar {
		height: 176rpx;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.bar-title {
		position: fixed;
		left: 0;
		right: 0;
		height: 176rpx;
		background-color: #FFFFFF;
		z-index: 999;
	}

	.search-container {
		padding-left: 20rpx;
		.u-icon {
			padding-right: 13rpx;
		}
    .search-item {
      width: 60%;
    }
	}
</style>
