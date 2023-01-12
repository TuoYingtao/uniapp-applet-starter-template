<script>
import { mapActions } from 'vuex'
import { checkAppUpdate, isSearchScene } from "@/utils/tools";

export default {
  // 全局变量机制
  globalData: {
    text: 'text'
  },

  methods: {
    getRouter() {
      console.log('小程序路由', ROUTES)
    },
    ...mapActions(['init']),
  },

  onLaunch: function (options) {
    console.log('小程序环境', process.env);
    console.log('小程序首次进入', options);
    this.init();
    this.getRouter();
    // 扫码参数
    const search = isSearchScene(options);
    // 检测小程序版本信息
    checkAppUpdate();
  },

  onLoad() {
    this.init();
  },

  onShow: function () {
  },

  onHide: function () {
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/common/css/common.scss";
// uView
@import "uview-ui/index.scss";
@import "@/wxcomponents/vant/common/index.wxss";
</style>
