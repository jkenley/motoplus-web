import { create } from 'zustand';

import { BASE_API_URL } from '@/lib/constants';
import { OrderData, QRCode, StoreState, TransformedItem } from '@/types/index';

const useStore = create<StoreState>((set) => ({
  dropdownValues: [],
  selectedOrder: null,
  orders: {},
  qrCodes: [],
  loading: false,
  setSelectedOrder: (identifier: string) => {
    set((state) => ({
      ...state,
      qrCodes: null,
      selectedOrder: state.orders[identifier] || null,
    }));
  },
  setQRCodes: (qrCodes: QRCode[]) => {
    set({
      qrCodes: qrCodes,
    });
  },
  fetchOrders: async () => {
    set(() => ({ loading: true }));

    try {
      const response = await fetch(`${BASE_API_URL}/api/qr-codes?populate[orderItem][populate]=*`);
      const jsonResponse = await response.json();

      const data: OrderData[] = jsonResponse.data;

      // Create dropdown values
      const dropdownValues = data.map((order) => ({
        label: order.attributes.identifier,
        value: order.attributes.identifier,
      }));

      // Create output data
      const outputData: { [key: string]: TransformedItem[] } = {};

      data.forEach((order) => {
        const orderIdentifier = order.attributes.identifier;

        outputData[orderIdentifier] = order.attributes.orderItem.map((item) => ({
          seed: item.seed,
          randomPartLength: item.length,
          numberOfCodes: item.quantity,
          brand: item.brand.data.attributes.name,
          code: item.code.data.attributes.code,
          size: item.size.data.attributes.size,
          type: item.type.data.attributes.type,
        }));
      });

      set({ dropdownValues, orders: outputData });
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));

export default useStore;
