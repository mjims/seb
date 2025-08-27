import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  steps: {
    merchant: boolean;
    store: boolean;
    touring: boolean;
    vehicle: boolean;
    driver: boolean;
    touring_assignment: boolean;
    store_assignment: boolean;
  };
  currentStep: string;
  setStepComplete: (step: string) => void;
  setCurrentStep: (step: string) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      steps: {
        merchant: false,
        store: false,
        touring: false,
        vehicle: false,
        driver: false,
        touring_assignment: false,
        store_assignment: false,
      },
      currentStep: 'merchant',
      setStepComplete: (step) =>
        set((state) => ({
          steps: { ...state.steps, [step]: true },
        })),
      setCurrentStep: (step) =>
        set(() => ({
          currentStep: step,
        })),
      resetOnboarding: () =>
        set(() => ({
          steps: {
            merchant: false,
            store: false,
            touring: false,
            vehicle: false,
            driver: false,
            touring_assignment: false,
            store_assignment: false,
          },
          currentStep: 'merchant',
        })),
    }),
    {
      name: 'onboarding-storage',
    },
  ),
);
