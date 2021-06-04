import { notification } from "antd";

export const openNotification = (success) => {
  notification.open({
    message: "success",
    type: "success",
    duration: 3,
    description: success,
  });
};
