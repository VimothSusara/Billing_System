import { useEffect } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";

import useAuthStore from "../store/authStore";

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
      <ToastContainer
        position="top-center"
        autoClose="2000"
        theme="dark"
        transition={Flip}
      />
    </>
  );
};

export default Dashboard;
