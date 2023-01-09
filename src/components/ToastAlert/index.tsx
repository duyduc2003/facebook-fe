import { toast } from 'react-toastify';
interface IToastAlert {
  type: 'success' | 'info' | 'error';
  message: string;
  duration?: number;
}

export const toastAlert = ({
  type = 'info',
  message,
  duration = 2000,
}: IToastAlert) => {
  if (!message || !message.length) return;
  const options = {
    position: 'top-right',
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  toast[type](message, options as any);
};
