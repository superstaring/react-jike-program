import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
//   导入富文本
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";
// 频道列表接口
import { publishAPi, getDetailByArticId, editApi } from "@/apis/publish";
import { useEffect, useState } from "react";
import { useChannel } from "@/hooks/useChannel";
const { Option } = Select;

const Publish = () => {
  // 路由跳转
  const navigate = useNavigate();
  const { channels } = useChannel();

  // 图片上传回调
  const [filelist, setFileList] = useState([]);
  const onUploadChange = (file) => {
    setFileList(file.fileList);
  };

  // 图片切换
  const [tabNum, settabNum] = useState(1);
  const tabChange = (e) => {
    settabNum(e.target.value);
    if (e.target.value === 1) {
      // 单图，截取第一张展示
      const imgList = filelist.length ? [filelist[0]] : [];
      setFileList(imgList);
    }
    if (e.target.value === 3) {
      setFileList(filelist);
    }
  };

  // 搜集表单数据
  const onFinish = (formValue) => {
    const { channel_id, content, title } = formValue;
    if (filelist.length !== tabNum)
      return message.warning("封面图片数量和类型不匹配");

    const params = {
      channel_id,
      content,
      title,
      type: tabNum,
      cover: {
        type: tabNum,
        // 处理新增和编辑的文件列表
        images: filelist.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
    };

    if (id) {
      // 更新文章
      editApi(id, params).then((res) => {
        navigate("/article");
      });
    } else {
      // 发布文章
      publishAPi(params).then((res) => {
        if (res.status === 400) {
          message.warning(res.data.message);
          return;
        }
        navigate("/article");
      });
    }
  };

  // 回填数据
  const [form] = Form.useForm();
  // 根据id获取文章详情
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    function getDetail() {
      getDetailByArticId(id).then((res) => {
        // 回填数据
        form.setFieldsValue({
          ...res.data,
          type: res.data.cover.type,
        });
        // 回填图片
        setFileList(
          res.data.cover.images.map((url) => {
            return { url };
          })
        );
        // 回填类型
        settabNum(res.data.cover.type);
      });
    }
    id && getDetail();
  }, [id, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${id ? "编辑文章" : "发布文章"}` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={tabChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {tabNum !== 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                maxCount={tabNum}
                onChange={onUploadChange}
                fileList={filelist}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map((item) => (
                // 获取的id
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
