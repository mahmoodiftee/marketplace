import React, { useEffect, useState, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hooks";
import { BsShopWindow } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { MdLibraryAdd } from "react-icons/md";
import {
  fetchTabs,
  scrollLeft,
  scrollRight,
  headerStyles,
} from "./userDashboardfunctions";
import { setSelectedTab } from "../../Redux/Features/Tabs/SelectedtabSlice";
import { clearAuth } from "../../Redux/Features/User/authSlice";

const { Header, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedTab } = useAppSelector((state) => state.tab);
  const [tabs, setTabs] = useState<{ id: number; name: string }[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const LogOutDispatch = useAppDispatch();
  const navigate = useNavigate();

  const appPost = location.pathname === "/user";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchTabs(setTabs);
  }, []);

  const handleTabClick = (category: string) => {
    dispatch(setSelectedTab(category));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-60" : "w-0"
        } bg-white text-black`}
      >
        <button className="md:mx-3 md:my-2 mt-2">
          <label className="hamburger">
            <input
              type="checkbox"
              checked={sidebarOpen}
              onChange={toggleSidebar}
              className="hidden"
            />
            <svg
              viewBox="0 0 32 32"
              className="w-12 h-12 transform transition-transform duration-300"
            >
              <path
                className={`${
                  sidebarOpen ? "stroke-black" : "stroke-black"
                }  line line-top-bottom`}
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path
                className={`${
                  sidebarOpen ? "stroke-black" : "stroke-black"
                } line`}
                d="M7 16 27 16"
              ></path>
            </svg>
          </label>
        </button>

        <div
          className={`${
            sidebarOpen ? "opacity-100 transition-opacity delay-200" : "opacity-0"
          } flex flex-col items-center pt-6 px-4 pr-5 space-y-4`}
        >
          <Link to="/user" className="w-full">
            <Button
              color="primary"
              className="w-full flex justify-start font-medium items-center gap-2.5 p-4 pl-6 text-lg"
              variant="filled"
            >
              <BsShopWindow className="" />
              Marketplace
            </Button>
          </Link>
          <Link to="/user/add-post" className="w-full">
            <Button
              color="primary"
              className="w-full flex justify-start font-medium items-center gap-2.5 p-4 pl-6 text-lg"
              variant="filled"
            >
              <MdLibraryAdd className="" />
              Add Post
            </Button>
          </Link>

          <Button
            onClick={logOutHandle}
            color="primary"
            className="w-full flex justify-start font-medium items-center gap-2.5 p-4 pl-6 text-lg"
            variant="filled"
          >
            <TbLogout className="" />
            Logout
          </Button>
        </div>
      </div>
      <Layout style={{ marginTop: appPost ? 70 : undefined }}>
        {appPost && (
          <Header className="fixed top-0 pl-24 overflow-hidden" style={headerStyles}>
            <div className={`max-w-maxWidth flex mx-auto justify-center items-center gap-2 gradient-mask`}>
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
                className="flex md:ml-0 pl-[38%] pr-[40%] md:px-0 md:pr-32 overflow-x-auto items-center no-scrollbar gap-4"
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
