import { create } from 'zustand';

interface UpdateStoreState {
  updateFlags: Record<string, boolean>;
  triggerUpdate: (endpoint: string) => void;
}

const useUpdateStore = create<UpdateStoreState>((set) => ({
  updateFlags: {},
  triggerUpdate: (endpoint) =>
    set((state) => ({
      updateFlags: {
        ...state.updateFlags,
        [endpoint]: !state.updateFlags[endpoint],
      },
    })),
}));

export default useUpdateStore;
