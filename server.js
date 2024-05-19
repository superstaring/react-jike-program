const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const items = [];
for (var i = 0; i < 100; i++) {
  items.push({
    id: `${i + 1}`,
    key: `${i + 1}`,
    name: `John Brown${i + 1}`,
    age: `${i + 1}`,
    address: `地址${i + 1}`,
    title: `标题${i + 1}`,
    status: 1,
    pubdate: "2024-05-19",
    read_count: `${i + 1}`,
    comment_count: `${i + 1}`,
    like_count: `${i + 1}`,
  });
}

// app.get("/forum/topicsAction/list", (req, res) => {
//   const { start = 0, limit = 20 } = req.query;
//   const pageNo = parseInt(start, 20);
//   res.json({
//     totalCount: items.length, // 数据总和
//     number: pageNo,
//     totalPages: Math.ceil(items1.length / limit),
//     size: limit,
//     objData: items.slice(pageNo * limit, (pageNo + 1) * limit),
//   });
//   // res.status(401).json({ status: 401 })
// });

app.post("/fill/authorizations", (req, res) => {
  res.json({
    data: {
      token: "tokenvalue",
    },
  });
});

app.get("/fill/userInfo", (req, res) => {
  res.json({
    data: {
      name: "张三",
    },
  });
});

app.get("/fill/channels", (req, res) => {
  res.json({
    data: {
      channels: [
        { id: "1", name: "推荐" },
        { id: "2", name: "发送" },
        { id: "3", name: "接收" },
      ],
    },
  });
});

app.post("/fill/mp/articles", (req, res) => {
  res.json({
    data: {
      msg: "发布文章成功",
    },
  });
});

app.post("/fill/edit/articles", (req, res) => {
  res.json({
    data: {
      msg: "发布文章成功",
    },
  });
});

app.get("/fill/articles/detail", (req, res) => {
  res.json({
    data: {
      channel_id: "1",
      content: "<p>11</p>",
      title: "标题",
      type: 1,
      cover: {
        type: 1,
        images: ["url1"],
      },
    },
  });
});

app.get("/fill/atciles/list", (req, res) => {
  res.json({
    data: {
      results: items,
      total_count: 100,
      page: 1,
      per_page: 10,
    },
  });
});

app.delete("/fill/articles/del", (req, res) => {
  res.json({
    data: {
      channels: [
        { id: "1", name: "推荐" },
        { id: "2", name: "发送" },
        { id: "3", name: "接收" },
      ],
    },
  });
});

app.listen("5000", () => {
  console.log("启动服务成功");
});
