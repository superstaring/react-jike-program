import { request } from "@/utils";

// 文章相关请求

// 获取文章列表
export function fetchArticleList(params) {
  return request({
    url: "/fill/atciles/list",
    method: "GET",
    params,
  });
}

// 删除文章
export function delApi(id) {
  return request({
    url: `/fill/articles/del?id=${id}`,
    method: "DELETE",
  });
}
