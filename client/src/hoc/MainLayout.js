import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearNotification } from "../store/actions";
import { showToast } from "../utills/tolls";

const MainLayout = (props) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : "Błąd";

      showToast("ERROR", msg);
      dispatch(clearNotification());
    }

    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : "Sukces";

      showToast("SUCCESS", msg);
      dispatch(clearNotification());
    }
  }, [notifications, dispatch]);

  return (
    <>
      {props.children}
      <ToastContainer autoClose={4000} theme="dark" />
    </>
  );
};

export default MainLayout;
