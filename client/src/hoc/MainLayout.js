import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearNotification } from "../store/actions";
import { showToast } from "../utills/tolls";
import NewsLetterBanner from "../utills/NewsLetterBanner";

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
      const time = notifications.time && notifications.time;
      showToast("SUCCESS", msg, time);
      dispatch(clearNotification());
    }
  }, [notifications, dispatch]);

  return (
    <>
      {props.children}
      <NewsLetterBanner />
      <ToastContainer autoClose={5000} theme="dark" pauseOnHover={false} />
    </>
  );
};

export default MainLayout;
