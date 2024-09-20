import React from 'react';

type ToastProps = {
  message: string;
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div style={styles.toastContainer}>
      <div style={styles.toast} className='dynamic-notif'>{message}</div>
    </div>
  );
};

const styles = {
  toastContainer: {
    position: 'fixed' as 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
  },
  toast: {
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Toast;
