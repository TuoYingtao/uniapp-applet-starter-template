import { request } from "@/utils/request"

export function homeApi(param) {
  return request.get({
    url: "/cms/banner/group",
    params: param
  })
}
