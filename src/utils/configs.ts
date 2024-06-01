import { TosterConfig } from './types.t';

export const toasterConfig: TosterConfig = {
  position: 'top-center', // Ensure this matches the ToastPosition type
  gutter: 12,
  containerStyle: { margin: '8px' },
  toastOptions: {
    success: {
      duration: 3000,
    },
    error: {
      duration: 5000,
    },
    style: {
      fontSize: '1rem',
      maxWidth: '500px',
      padding: '16px 24px',
      backgroundColor: 'var(--color-grey-0)',
      color: 'var(--color-grey-700)',
    },
  },
};
