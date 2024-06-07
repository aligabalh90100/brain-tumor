import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (msg, type) => {
  if (type === "success") {
    return toast.success(msg);
  }
};

export default notify;
