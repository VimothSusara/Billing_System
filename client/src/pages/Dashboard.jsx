import { useEffect } from "react";
import { toast } from "react-toastify";

import useAuthStore from "@/store/authStore";
import Toast from "@/components/Toast";

const Dashboard = () => {
  const { toastMessage, clearToast } = useAuthStore();

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      clearToast();
    }
  }, [toastMessage, clearToast]);

  return (
    <>
      <h1>Dashboard Page</h1>
      <Toast />
    </>
  );
};

export default Dashboard;
