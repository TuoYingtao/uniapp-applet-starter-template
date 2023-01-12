import {getUserInfoStorage} from "@/utils/storage";
import {navigateTo} from "@/utils/navigate";
import {userAuditStatusApi} from "@/api/auditSteps";
import {silenceAuthorizedLogin} from "@/utils/requestTools";
import {NewUserRegisterEnum} from "@/enum/HomeEnum";

/**
 * 验证商家是否注册登录
 * @param successCallback 已注册执行
 * @param errorCallback 未注册执行
 * @param isSilence 是否手动调用静默登录
 * @returns {*}
 */
export function isRegisterMerchant(successCallback = null, errorCallback = null, isSilence = false) {
  let userInfo = getUserInfoStorage();
  if (isSilence && userInfo.status != NewUserRegisterEnum.NEW_STATUS) silenceAuthorizedLogin().then(r => (userInfo.status = 1));
  if (userInfo.status != NewUserRegisterEnum.NEW_STATUS) {
    if (errorCallback != null) {
      return errorCallback();
    } else {
      userAuditStatusApi().then(userAuditStatus => {
        switch (userAuditStatus) {
          case 0:
            return navigateTo({
              url: "/pages_merchant/regist/index"
            });
            break;
          case 1:
          case 3:
            return navigateTo({
              url: "/pages_result/auditSteps",
              query: {
                userAuditStatus,
              }
            });
            break
          default:;
        }
      })
    }
  } else {
    if (successCallback != null) {
      return successCallback(userInfo)
    }
  }
}
