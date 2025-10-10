import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const handleLogout = () => {
  const navigate = useNavigate();

  //   const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
  toast("Logged out successfully");
  //   };
};
