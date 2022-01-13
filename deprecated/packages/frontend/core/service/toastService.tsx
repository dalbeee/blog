import { toast } from "react-toastify";

export class ToastService {
  push(message: string) {
    toast(message);
  }

  info(message: string) {
    toast.info(message);
  }

  error(message: string) {
    toast.error(message);
  }
  success(message: string) {
    toast.success(message);
  }
  warn(message: string) {
    toast.warning(message);
  }
}
