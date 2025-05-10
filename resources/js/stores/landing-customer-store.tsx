import { CustomerT } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomerState {
    customer: CustomerT | null;
    setCustomer: (customer: CustomerT) => void;
}

const useLandingCustomerStore = create<CustomerState>()(
    persist(
        (set) => ({
            customer: null,
            setCustomer: (customer) => set({ customer }),
        }),
        {
            name: 'landing-customer-store',
        },
    ),
);

export default useLandingCustomerStore;
