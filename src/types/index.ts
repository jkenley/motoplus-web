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
  setLoading: (loading: boolean) => void;
  setSelectedOrder: (identifier: string) => void;
  setQRCodes: (qrCodes: QRCode[]) => void;
  fetchOrders: () => Promise<void>;
}

export interface FormFieldsProps {
  values: FormValues;
  errors: FormErrors;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  qrCode: string;
}

export interface FormValues {
  store: string;
  qrCode: string;
  fullName: string;
  phoneNumber: string;
  note: string;
}

export interface FormErrors {
  store?: string;
  fullName?: string;
  phoneNumber?: string;
  note?: string;
}
