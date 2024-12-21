import React, { useEffect, useState, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hooks";
import { BsShopWindow } from "react-icons/bs";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { MdLibraryAdd } from "react-icons/md";

import {
  fetchTabs,
  scrollLeft,
  scrollRight,
  logOutHandle,
  headerStyles,
  siderStyles,
} from "./userDashboardfunctions";
import { setSelectedTab } from "../../Redux/Features/Tabs/SelectedtabSlice";

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { selectedTab } = useAppSelector((state) => state.tab);
  const [tabs, setTabs] = useState<{ id: number; name: string }[]>([]);
  const LogOutDispatch = useAppDispatch();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const appPost = location.pathname === "/user";

  useEffect(() => {
    fetchTabs(setTabs);
  }, []);
  const handleTabClick = (category: string) => {
    dispatch(setSelectedTab(category));
  };

  return (
    <Layout hasSider style={{ height: "auto" }}>
      {/* <Sider
        style={siderStyles}
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
            onClick={() => setCollapsed(!collapsed)}
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
              icon: <MdLibraryAdd />,
              label: <Link to="/user/add-post">Add post</Link>,
            },
            {
              key: "3",
              icon: <TbLogout />,
              label: (
                <button onClick={() => logOutHandle(LogOutDispatch, navigate)}>
                  Logout
                </button>
              ),
            },
          ]}
        />
      </Sider> */}
      <Layout style={{ marginTop: appPost ? 70 : undefined }}>
        {appPost && (
          <Header style={headerStyles}>
            <div
              className={`max-w-maxWidth flex mx-auto justify-center items-center gap-2 gradient-mask `}
            >
              <div className="flex items-center gap-2">
                <Button
                  color="default"
                  variant="filled"
                  className="hidden md:flex"
                  icon={<LeftOutlined />}
                  onClick={() => scrollLeft(menuRef)}
                />
                <Button
                  color="default"
                  variant="filled"
                  className="hidden md:flex"
                  icon={<RightOutlined />}
                  onClick={() => scrollRight(menuRef)}
                />
              </div>

              <div
                ref={menuRef}
                className="flex pl-[38%] pr-[40%] md:px-0 md:pr-32 overflow-x-auto items-center no-scrollbar gap-4"
                style={{
                  flexGrow: 1,
                  whiteSpace: "nowrap",
                  scrollBehavior: "smooth",
                }}
              >
                {tabs.map((item, index) => (
                  <Button
                    key={item?.id || `tab-${index}`}
                    color={selectedTab === item.name ? "primary" : "default"}
                    variant={selectedTab === item.name ? "solid" : "filled"}
                    onClick={() => handleTabClick(item.name)}
                  >
                    {item?.name}
                  </Button>
                ))}
              </div>
            </div>
          </Header>
        )}
        <Content
          className={`max-w-maxWidth mx-auto px-2`}
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
