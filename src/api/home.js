import { request } from "@/utils/request"

export function homeApi(param) {
  return request.get({
    url: "/api/homeData",
    params: param
  })
}
