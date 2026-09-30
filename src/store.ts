import { create } from "zustand";
import { persist } from "zustand/middleware";

interface I_CountStore {
    delivery_count: number;
    pickup_count: number;
    update_d_count: (newValue: number) => void;
    update_p_count: (newValue: number) => void;
    resetCount: () => void;
};

export const CountStore = create<I_CountStore>()(
    persist((set) => ({
        delivery_count: 0,
        pickup_count: 0,
        update_d_count: (newValue) => set({
            delivery_count: newValue
        }),
        update_p_count: (newValue) => set({
            pickup_count: newValue
        }),
        resetCount: () => set({
            delivery_count: 0,
            pickup_count: 0
        })
    }), {
        name: "counter-store",
        partialize: (state) => ({
            delivery_count: state.delivery_count,
            pickup_count: state.pickup_count
        })
    })
);