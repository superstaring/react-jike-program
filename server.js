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
    key: i,
    name: `John Brown${i}`,
    age: i,
    address: `地址${i}`,
    title: `标题${i}`,
  });
}

const items1 = [];
for (let i = 0; i < 100; i++) {
  items1.push([
    `${i + 1}`,
    `标题${i + 1}`,
    `作者${i + 1}`,
    `时间${i + 1}`,
    `回帖个数${i + 1}`,
    `回复个数${i + 1}`,
  ]);
}

// app.get("/forum/topicsAction/list", (req, res) => {
//   const { start = 0, limit = 20 } = req.query;
//   const pageNo = parseInt(start, 20);
//   res.json({
//     totalCount: items1.length, // 数据总和
//     number: pageNo,
//     totalPages: Math.ceil(items1.length / limit),
//     size: limit,
//     objData: items1.slice(pageNo * limit, (pageNo + 1) * limit),
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

app.listen("5000", () => {
  console.log("启动服务成功");
});
