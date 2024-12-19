import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks/hooks";
import { clearAuth } from "../../Redux/Features/User/authSlice";
import { BsShopWindow } from "react-icons/bs";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  borderRight: "1px solid #e0e0e0",
  background: "#fff",
};

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const LogOutDispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const logOutHandle = async () => {
    try {
      LogOutDispatch(clearAuth());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Layout hasSider style={{ height: "auto" }}>
      <Sider
        style={siderStyle}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsedState) => setCollapsed(collapsedState)}
        collapsedWidth="60"
        trigger={null}
      >
        <div
          className={`${
            collapsed ? "justify-center" : "justify-between"
          } flex items-center`}
        >
          <div className={`pl-7 ${collapsed ? "hidden" : "flex"} font-bold`}>
            User
          </div>
          <Button
            type="text"
            icon={
              collapsed ? (
                <RiArrowRightDoubleLine className="text-xl font-bold" />
              ) : (
                <RiArrowLeftDoubleLine className="text-xl" />
              )
            }
            onClick={toggleCollapse}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BsShopWindow />,
              label: <Link to="/user">Marketplace</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/user/dashboard">Dashboard</Link>,
            },
            {
              key: "3",
              icon: <TbLogout />,
              label: <button onClick={logOutHandle}>Logout</button>,
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginInlineStart: collapsed? 60 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
          }}
        ></Header>
        <Content
          style={{
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
