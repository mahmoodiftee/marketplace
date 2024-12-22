import React, { useState } from "react";
import { Button, Form, Input, Upload, UploadFile, UploadProps } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  SkypeOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const SignIn: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  
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
  
      // Set only the imgURL in the user_Image field
      form.setFieldsValue({ user_Image: imgURL });
  
      // Update the fileList state for the Upload component
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

  const onFinish = async (values: unknown) => {
    try {
      console.log("User data before sending:", values);
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen p-4 bg-gray-100">
      <Form
        form={form}
        name="signin-form"
        onFinish={onFinish}
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        validateMessages={validateMessages}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Sign Up
        </h2>

        <Form.Item
          name="user_Name"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username *" />
        </Form.Item>

        <Form.Item
          name="user_Address"
          rules={[{ required: true, message: "User address is required" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Yours Address *" />
        </Form.Item>

        <Form.Item
          name="user_Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Valid email is required",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email *" />
        </Form.Item>

        <Form.Item
          name="user_Password"
          rules={[
            {
              required: true,
              message: "Strong password is required",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters long",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password is Required *"
          />
        </Form.Item>

        <Form.Item
          name="user_PhoneNumber"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone Number *" />
        </Form.Item>

        <Form.Item
          name="user_Facebook"
          rules={[
            { required: true, message: "Facebook profile url is required" },
          ]}
        >
          <Input
            prefix={<FacebookOutlined />}
            placeholder="Facebook profile url*"
          />
        </Form.Item>

        <Form.Item name="user_Skype">
          <Input prefix={<SkypeOutlined />} placeholder="Skype profile url *" />
        </Form.Item>

        <Form.Item name="user_Telegram">
          <Input
            prefix={<SkypeOutlined />}
            placeholder="Telegram Profile url *"
          />
        </Form.Item>
        <Form.Item
          className="w-full flex justify-center"
          name="user_Image"
          rules={[{ required: true, message: "Please Select Product Image" }]}
        >
          <Upload
            className="md:min-w-96 min-w-72"
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
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", fontWeight: "bold" }}
          >
            Submit
          </Button>
        </Form.Item>
        <p>
          Already Signed In?{" "}
          <Link to={"/login"}>
            <span className="text-green-600">Click Here</span>
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignIn;
