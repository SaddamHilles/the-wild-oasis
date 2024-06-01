import { ToastPosition } from 'react-hot-toast';

export type Nullable<T> = T | null | undefined;
export type CabinType = {
  id: number;
  created_at: string;
  description: string;
  discount: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

export type TosterConfig = {
  position: ToastPosition;
  gutter: number;
  containerStyle: React.CSSProperties;
  toastOptions: {
    success: {
      duration: number;
    };
    error: {
      duration: number;
    };
    style: React.CSSProperties;
  };
};

export type FormCabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};
