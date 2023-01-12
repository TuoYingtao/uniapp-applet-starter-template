import { setToken } from "@/utils/storage";

const user = {
	state: {
		info: null, // 用户信息 {id, name}
		// 定位信息
		location: {
			longitude: null,
			latitude: null,
			/** 获取时间，毫秒时间戳，0表示未获取过 */
			create_time: 0,
		}
	},

	mutations: {
		SET_INFO(state, payload = null) {
			state.info = payload;
		},
		// 设置位置
		SET_LOCATION(state, payload) {
			state.location.longitude = payload.longitude ?? null;
			state.location.latitude = payload.latitude ?? null;
			state.location.create_time = (payload.longitude || payload.latitude) ? new Date().valueOf() : 0;
		}
	},

	actions: {
		userInfo({ commit }, userInfo) {
			commit("SET_INFO", userInfo);
		},

		logout({ commit }) {
			setToken();
			commit("SET_INFO");
			return Promise.resolve();
		},

		// 获取用户位置 如果已获取过，会返回上次位置
		getLocation({ state, commit }, payload = {
			forceUpdate: false, // 是否强制更新
		}) {
			let locationPromise = Promise.resolve(state.location);
			if (state.location.create_time == 0 || payload.forceUpdate) {
				locationPromise = uni.getLocation({
					type: 'gcj02'
				}).then(([err, res]) => {
					if (err) throw new Error(err?.errMsg ?? '未知错误');
					commit('SET_LOCATION', { longitude: res.longitude, latitude: res.latitude });
					return state.location;
				})
			}
			return locationPromise
		}
	}
}

export default user;
