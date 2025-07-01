import toast from "react-hot-toast";

export const AxiosToastError = (error) => {
  return toast.error(error);
};
