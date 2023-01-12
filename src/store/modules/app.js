import global from "@/config/global";
import {getSystemInfo} from "@/utils/tools";

const app = {
  state: {
    // 项目名称和版本号，可在页面中用于显示
    app_name: '',
    app_version: global.app_version,
    app_version_code: 0,
    // 服务端配置
    server_config: {
      src: global.src,
      // 用户key 用于统计 PV UV
      userKey: global.userKey,
      // 开屏背景图
      entry_background_img: '',
    },
    // 设备信息
    device_info: {
      SDKVersion: '',
      batteryLevel: 0,
      benchmarkLevel: 1,
      brand: '',
      deviceId: '',
      deviceOrientation: '',
      devicePixelRatio: 1,
      enableDebug: false,
      fontSizeSetting: 16,
      language: 'zh_CN',
      isIosPlatform: null,
      isIphoneX: null,
      model: '',
      pixelRatio: 1,
      platform: '',
      safeArea: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
      },
      safeAreaInsets: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      screenHeight: 0,
      screenWidth: 0,
      statusBarHeight: 44,
      system: '',
      version: '',
      windowHeight: 0,
      windowWidth: 0,

      // 在小程序下存在
      appName: '',
      appVersion: '',
      appVersionCode: 0,
    },
    // 胶囊按钮位置
    menu_button_bounding: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0
    }
  },
  mutations: {
    SET_APP_NAME(state, name = '') {
      state.app_name = name
    },
    SET_APP_VERSION(state, version = '') {
      state.app_version = version
    },
    SET_APP_VERSION_CODE(state, code = 0) {
      state.app_version_code = code
    },
    SET_SERVER_CONFIG(state, payload = null) {
      Object.assign(state.server_config, payload);
    },
    SET_DEVICE_INFO(state, payload = {}) {
      Object.assign(state.device_info, payload);
    },
    GET_MENU_BUTTON_BOUNDING(state, buttonBounding) {
      Object.assign(state.menu_button_bounding, buttonBounding);
    }
  },
  actions: {
    // 自动获取系统信息和胶囊按钮
    updateDeviceInfo({commit}) {
      const systemInfo = getSystemInfo();
      systemInfo.appName = process.env.VUE_APP_NAME;
      systemInfo.appVersion = process.env.APP_VERSION;
      commit("SET_DEVICE_INFO", systemInfo);
      return systemInfo;
    },
    // 应用初始化，自动应用名、版本号、设备信息、胶囊按钮等固定信息。
    init({dispatch, commit, state}) {
      commit('GET_MENU_BUTTON_BOUNDING', uni.getMenuButtonBoundingClientRect())
      return dispatch('updateDeviceInfo').then(sysinfo => {
        if (sysinfo.appName) {
          commit('SET_APP_NAME', sysinfo.appName)
        }
        if (sysinfo.appVersion) {
          commit('SET_APP_VERSION', sysinfo.appVersion)
        }
        if (sysinfo.appVersionCode) {
          commit('SET_APP_VERSION_CODE', sysinfo.appVersionCode)
        }
        return {
          app_name: state.app_name,
          app_version: state.app_version,
          app_version_code: state.app_version_code,
          device_info: state.device_info,
          menu_button_bounding: state.menu_button_bounding,
        }
      })
    }
  }
}

export default app


