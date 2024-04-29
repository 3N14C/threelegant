import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IOfferView {
  offerView: boolean;
  setOfferView: (offerView: boolean) => void;
}

export const useViewOffer = create<IOfferView>()(
  devtools(
    persist(
      (set) => ({
        offerView: true,
        setOfferView: (offerView: boolean) => set({ offerView }),
      }),

      {
        name: "offer-view",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
