import React, { useState } from "react";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
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
  zIndex: 15,
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
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

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
      <Layout
        style={{ marginInlineStart: 60, marginTop: 70 }}
      >
        <Header
          style={{ paddingLeft: 0 }}
          className="fixed top-0 w-full z-10 border-b-[1px] bg-[#f0f2f5] flex justify-center items-center overflow-hidden"
        >
          <div className="max-w-maxWidth mx-auto flex justify-center items-center gap-2 gradient-mask ">
            <div className="flex items-center gap-2">
              <Button
                className="hidden md:flex"
                icon={<LeftOutlined />}
                onClick={scrollLeft}
              />
              <Button
                className="hidden md:flex"
                icon={<RightOutlined />}
                onClick={scrollRight}
              />
            </div>

            <div
              ref={menuRef}
              className="flex overflow-x-auto items-center no-scrollbar gap-4"
              style={{
                flexGrow: 1,
                whiteSpace: "nowrap",
                scrollBehavior: "smooth",
              }}
            >
              {[...Array(25).keys()].map((item) => (
                <Button key={item} color="default" variant="solid">
                  menu item {item + 1}
                </Button>
              ))}
            </div>
          </div>
        </Header>
        <Content
          className={`max-w-maxWidth mx-auto ${
            collapsed ? "p-1" : "p-1 md:p-6"
          }`}
          style={{
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
