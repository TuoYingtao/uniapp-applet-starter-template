const GLOBAL_CONFIG = {
  API_BASE_URL: '', // api请求地址
  PREVIEW_PICTURE_URL: '', // 图片域名
  APPLET_APPID: '', // AppID
}

// COS 云存储对象
const COS_DATA = {
  Bucket: '',
  Region: '',
}

const previewPictureUrl = `https://${COS_DATA.Bucket}.cos.${COS_DATA.Region}.myqcloud.com/`

const APPLET_MAP = {
  WX_APP_ID: 'wx82ccbac5ad7ec480',
}

function appleEnvAppID() {
  switch (process.env.VUE_APP_PLATFORM) {
    case 'mp-weixin':
      return APPLET_MAP.WX_APP_ID;
      break;
    default: '';
  }
}

if (process.env.NODE_ENV === 'development') {
  GLOBAL_CONFIG.API_BASE_URL = 'https://192.168.31.119:8080';
  GLOBAL_CONFIG.PREVIEW_PICTURE_URL = previewPictureUrl;
  GLOBAL_CONFIG.APPLET_APPID = appleEnvAppID();
} else if (process.env.NODE_ENV === 'production') {
  GLOBAL_CONFIG.API_BASE_URL = '';
  GLOBAL_CONFIG.PREVIEW_PICTURE_URL = previewPictureUrl;
  GLOBAL_CONFIG.APPLET_APPID = appleEnvAppID();
} else if (process.env.NODE_ENV === 'staging') {
  GLOBAL_CONFIG.API_BASE_URL = '';
  GLOBAL_CONFIG.PREVIEW_PICTURE_URL = previewPictureUrl;
  GLOBAL_CONFIG.APPLET_APPID = appleEnvAppID();
}

module.exports = GLOBAL_CONFIG
