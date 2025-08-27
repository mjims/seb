import { create } from 'zustand';

import type { UserType } from '@/types/user';

interface AuthStore {
  user: UserType | undefined;
  setUser: (user: UserType | undefined) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));
