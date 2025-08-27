import { create } from 'zustand';

interface ServerStore {
  serverDown: boolean;
  setServerDown: (server: boolean) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  serverDown: false,
  setServerDown: (serverDown) => set({ serverDown }),
}));
