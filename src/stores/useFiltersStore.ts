import { create } from "zustand";
import { MetricsFilters } from "../types/metrics.typs";

interface FiltersState {
  filterValues?: MetricsFilters;
  setFilterValues: (filterValues: MetricsFilters) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  filterValues: {
    date_level: "year",
    region_id: "10",
    province_id: "101000",
    neighborhood_id: "101000666",
    property_type_id: 4,
  },

  setFilterValues: (filterValues) => set({ filterValues: filterValues }),
  reset: () =>
    set({
      filterValues: {
        date_level: "year",
        region_id: "10",
        province_id: "101000",
        neighborhood_id: "101000666",
        property_type_id: 4,
      },
    }),
}));
