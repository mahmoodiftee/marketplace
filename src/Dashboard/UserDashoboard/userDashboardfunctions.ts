import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks/hooks";
import { clearAuth } from "../../Redux/Features/User/authSlice";

export const fetchTabs = async (
  setTabs: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>
) => {
  try {
    const response = await fetch("/tabs.json");
    const data = await response.json();
    setTabs(data);
  } catch (error) {
    console.error("Error fetching tabs:", error);
  }
};

export const scrollLeft = (menuRef: React.RefObject<HTMLDivElement>) => {
  if (menuRef.current) {
    menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
  }
};

export const scrollRight = (menuRef: React.RefObject<HTMLDivElement>) => {
  if (menuRef.current) {
    menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
  }
};

export const logOutHandle = async (
  dispatch: ReturnType<typeof useAppDispatch>,
  navigate: ReturnType<typeof useNavigate>
) => {
  try {
    dispatch(clearAuth());
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const siderStyles: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed" as const,
  zIndex: 15,
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  borderRight: "1px solid #e0e0e0",
  background: "#fff",
};

export const headerStyles: React.CSSProperties = {
  paddingLeft: 0,
  position: "fixed" as const,
  top: 0,
  width: "100%",
  zIndex: 50,
  borderBottom: "1px solid #f0f2f5",
  background: "#f0f2f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};
