interface Brand {
  data: {
    attributes: {
      name: string;
    };
  };
}

interface Code {
  data: {
    attributes: {
      code: string;
    };
  };
}

interface Size {
  data: {
    attributes: {
      size: string;
    };
  };
}

interface Type {
  data: {
    attributes: {
      type: string;
    };
  };
}

interface OrderItem {
  seed: string;
  length: number;
  quantity: number;
  brand: Brand;
  code: Code;
  size: Size;
  type: Type;
}

interface OrderAttributes {
  identifier: string;
  orderItem: OrderItem[];
}

export interface OrderData {
  attributes: OrderAttributes;
}

export interface DropdownValue {
  label: string;
  value: string;
}

export interface TransformedItem {
  seed: string;
  randomPartLength: number;
  numberOfCodes: number;
  brand: string;
  code: string;
  size: string;
  type: string;
}

export interface QRCodeParams {
  seed: string;
  randomPartLength: number;
  numberOfCodes: number;
  brand: string;
  code: string;
  size: string;
  type: string;
}

export interface QRCode {
  qrCode: string;
}

export interface StoreState {
  dropdownValues: DropdownValue[];
  selectedOrder: TransformedItem[] | null;
  orders: { [key: string]: TransformedItem[] };
  qrCodes: QRCode[] | null;
  loading: boolean;
  setSelectedOrder: (identifier: string) => void;
  setQRCodes: (qrCodes: QRCode[]) => void;
  fetchOrders: () => Promise<void>;
}

export interface OrderValues {
  store: string;
  qrCode: string;
  fullName: string;
  phoneNumber: string;
  note: string;
}

export interface OrderErrors {
  store?: string;
  fullName?: string;
  phoneNumber?: string;
  note?: string;
}

export interface FormFieldsProps {
  values: OrderValues;
  errors: OrderErrors;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  qrCode: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export type Data = {
  status: number;
  message: string;
  data?: any;
};
