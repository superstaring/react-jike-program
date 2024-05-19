import { request } from "@/utils";

// 发布文章相关请求

// 获取频道列表
export function getchannels() {
  return request({
    url: "/fill/channels",
    method: "GET",
  });
}

// 提交文章表单
export function publishAPi(data) {
  return request({
    url: "/fill/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

export function getDetailByArticId(id) {
  return request({
    url: "/fill/articles/detail?id=id",
    method: "GET",
  });
}

export function editApi(data) {
  return request({
    url: "/fill/edit/articles",
    method: "POST",
    data,
  });
}
