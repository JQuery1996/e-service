import { toast, Theme, ToastOptions } from "react-toastify";

const toastOptions = {
    position: "top-right",
    rtl: true,
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: process.env.REACT_APP_NOTIFICATION_THEME! as Theme,
} as ToastOptions;
export function notify(type: "success" | "info" | "error", message: string) {
    switch (type) {
        case "success":
            return toast.success(message, toastOptions);
        case "error":
            return toast.error(message, toastOptions);
        default:
            return null;
    }
}
