import {create} from 'zustand';
import { Kpis } from '../types/metrics.typs';

interface KpisState {
kpis?: Kpis;
setKpis: (kpis: Kpis) => void;
reset: () => void;
}

export const useKpisStore = create<KpisState>((set) => ({
    kpis: undefined,
    setKpis: (kpis) => set({ kpis: kpis }),
    reset: () => set({ kpis: undefined }),
  }));
  
