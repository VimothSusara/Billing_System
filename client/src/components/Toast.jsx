import { Flip, ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose="2000"
      theme="dark"
      transition={Flip}
    />
  );
};

export default Toast;
