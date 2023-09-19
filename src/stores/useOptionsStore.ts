import { create } from "zustand";
import { options } from "../types/options.types";

interface OptionsState {
  options: options;
  setOptions: (options: options) => void;
  reset: () => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
  options: {
    devicePixelRatio: 2,
    responsive: true,
    scales: {
      y: {
        position: "right",
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
      y1: {
        grid: {
          display: false,
        },
      },
      legend: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  },
  setOptions: (options) => set({ options: options }),
  reset: () => set({ options: undefined }),
}));
