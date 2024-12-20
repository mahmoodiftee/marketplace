import { PlusOutlined } from "@ant-design/icons";
import { Button, Select, Form, Space, Upload, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import axios from "axios";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddPost = () => {
  const [tabs, setTabs] = useState<{ id: number; name: string }[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await fetch("/tabs.json");
        const data = await response.json();
        setTabs(data);
      } catch (error) {
        console.error("Error fetching tabs:", error);
      }
    };
    fetchTabs();
  }, []);

  const handleCustomRequest: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    const uploadData = new FormData();
    uploadData.append("image", file as Blob);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: "e63830251586e4c27e94823af65ea6ca",
          },
        }
      );

      const imgURL = response.data.data.url;

      form.setFieldsValue({ image: imgURL });

      setFileList([
        {
          uid: "1",
          name: "image.png",
          status: "done",
          url: imgURL,
        },
      ]);
      onSuccess?.("Upload successful!");
    } catch (error) {
      console.error("Error uploading image:", error);
      onError?.(error as Error);
    }
  };

  const handleRemove = () => {
    form.setFieldsValue({ image: null });
    setFileList([]);
  };

  const onFinish = (values: any) => {
    console.log("Form submitted with values: ", values);
  };

  const handleReset = () => {
    form.resetFields();
    setFileList([]);
  };

  return (
    <div className="">
      <Form
        form={form}
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
          "color-picker": null,
        }}
        className="max-w-[600px] md:min-w-[600px]"
      >
        {/* Uploader Name */}
        <Form.Item
          name="uploaderName"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input placeholder="Your Name" />
        </Form.Item>

        {/* Address */}
        <Form.Item name="address">
          <Input placeholder="Your Address" />
        </Form.Item>

        {/* Facebook Url */}
        <Form.Item name="facebook">
          <Input placeholder="Facebook Url" />
        </Form.Item>

        {/* WhatsApp Number */}
        <Form.Item
          name="whatsApp"
          rules={[
            { required: true, message: "Please input your WhatsApp number!" },
          ]}
        >
          <Input placeholder="WhatsApp Number" style={{ width: "100%" }} />
        </Form.Item>

        {/* Telegram Url */}
        <Form.Item name="telegram">
          <Input placeholder="Telegram Url" />
        </Form.Item>

        {/* Skype Url */}
        <Form.Item name="skype">
          <Input placeholder="Skype Url" />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Phone Number" style={{ width: "100%" }} />
        </Form.Item>

        {/* Product Name */}
        <Form.Item
          name="productName"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>

        {/* Product Description */}
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please Provide Description" }]}
        >
          <TextArea placeholder="Description" rows={4} />
        </Form.Item>

        {/* Category Selection */}
        <Form.Item
          name="category"
          hasFeedback
          rules={[{ required: true, message: "Please select your category!" }]}
        >
          <Select placeholder="Please select a category">
            {tabs.map((tab) => (
              <Option key={tab.id} value={tab.name}>
                {tab.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          rules={[{ required: true, message: "Please Select Product Image" }]}
        >
          <Upload
            customRequest={handleCustomRequest}
            listType="picture-card"
            fileList={fileList}
            onRemove={handleRemove}
          >
            {fileList.length === 0 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={handleReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};


export default AddPost;
