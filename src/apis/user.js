import { request } from "@/utils";

// 用户相关的所有请求

// 登录请求
export function loginAPI(formData) {
  return request({
    url: "/fill/authorizations",
    method: "POST",
    data: formData,
  });
}

// 获取用户数据
export function getProfileAPI() {
  return request({
    url: "/fill/userInfo",
    method: "GET",
  });
}
