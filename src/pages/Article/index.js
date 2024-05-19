import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { fetchArticleList, delApi } from "@/apis/article";
import { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  // 路由跳转
  const navigate = useNavigate();
  const { channels: channel } = useChannel();

  // 请求表格数据
  const [list, setList] = useState([]);
  const [count, setCount] = useState([]);
  // 筛选准备参数
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  useEffect(() => {
    // 请求数据列表
    function getList(reqData = {}) {
      fetchArticleList(reqData).then((res) => {
        setList(res.data.results);
        setCount(res.data.total_count);
      });
    }

    getList(reqData);
  }, [reqData]);

  // 筛选文章列表
  const onFinish = (formValue) => {
    const { channel_id, date, status } = formValue;
    setReqData({
      ...reqData,
      channel_id,
      begin_pubdate: date ? date[0].format("YYYY-MM-DD") : null,
      end_pubdate: date ? date[1].format("YYYY-MM-DD") : null,
      status,
    });
    // 2. 使用参数获取新的列表
  };
  // 分页
  const pageHandel = (page) => {
    setReqData({
      ...reqData,
      page,
    });
  };
  // 删除
  const delArticle = (id) => {
    delApi(id).then((res) => {
      setReqData({
        page: 1,
        per_page: 4,
      });
    });
  };
  // 跳转编辑页
  const gotoEdit = (id) => {
    navigate(`/publish?id=${id}`);
  };

  // 通过枚举定义
  const state = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>,
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img
            src={cover?.images?.[0] || img404}
            width={80}
            height={60}
            alt=""
          />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => state[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => gotoEdit(data.id)}
            />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channel.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: pageHandel,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
