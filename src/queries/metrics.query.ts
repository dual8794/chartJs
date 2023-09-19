import { useQuery } from "@tanstack/react-query";
// import { MetricsResponse } from "../types/metrics.typs"
// import { UseFormReturnType } from "@mantine/form";
import axios from "axios";
import {
  MetricsFilters,
  Neighborhood,
  Province,
  Region,
  propertyType,
} from "../types/metrics.typs";

const getTransactionsGrowth = async (
  filters?: MetricsFilters
  // date_level?: string,
  // region_id?: string,
  // province_id?: string,
  // neighborhood_id?: string,
  // property_type_id?: number,
  // start_date?: string,
  // end_date?: string,
) => {
  const response = await axios.get(
    "https://misbar-backend-chartjs.azurewebsites.net/api/transaction/growth/" +
      `?${filters?.date_level ? "date_level=" + filters?.date_level : ""}${
        filters?.region_id ? "&region_id=" + filters?.region_id : ""
      }
      ${filters?.start_date ? "&start_date=" + filters?.start_date : ""}${
        filters?.end_date ? "&end_date=" + filters?.end_date : ""
      }
        ${filters?.province_id ? "&province_id=" + filters?.province_id : ""}${
        filters?.neighborhood_id
          ? "&neighborhood_id=" + filters?.neighborhood_id
          : ""
      }${
        filters?.property_type_id
          ? "&property_type_id=" + filters?.property_type_id
          : ""
      }`
  );
  return response.data;
};

export const useTransactionsGrowthQuery = (
  filters?: MetricsFilters
  // date_level?: string,
  // region_id?: string,
  // province_id?: string,
  // neighborhood_id?: string,
  // property_type_id?: number,
  // start_date?: string,
  // end_date?: string,
) =>
  useQuery(
    [
      "transactions",
      filters,
      // date_level,
      // region_id,
      // province_id,
      // neighborhood_id,
      // property_type_id,
      // start_date,
      // end_date,
    ],
    () =>
      getTransactionsGrowth(
        filters

        // date_level,
        // region_id,
        // province_id,
        // neighborhood_id,
        // property_type_id,
        // start_date,
        // end_date,
      ),

    { refetchOnWindowFocus: false }
  );

const getRegions = async () => {
  const response = await axios.get("https://misbar-backend-chartjs.azurewebsites.net/api/regions/");
  return response.data;
};

export const useRegionsQuery = () =>
  useQuery<Region[]>(["regions"], () => getRegions(), {
    refetchOnWindowFocus: false,
  });

const getProvinces = async (region_id?: string) => {
  const response = await axios.get(
    "https://misbar-backend-chartjs.azurewebsites.net/api/provinces/" +
      `?${region_id ? "&region_id=" + region_id : ""}`
  );
  return response.data;
};

export const useProvincesQuery = (region_id?: string) =>
  useQuery<Province[]>(
    ["provinces", region_id],
    () => getProvinces(region_id),
    { refetchOnWindowFocus: false }
  );

const getNeighborhoods = async (province_id?: string) => {
  const response = await axios.get(
    "https://misbar-backend-chartjs.azurewebsites.net/api/neighborhood/" +
      `?${province_id ? "&province_id=" + province_id : ""}`
  );
  return response.data;
};

export const useNeighborhoodsQuery = (province_id?: string) =>
  useQuery<Neighborhood[]>(
    ["neighborhoods", province_id],
    () => getNeighborhoods(province_id),
    { refetchOnWindowFocus: false }
  );

const getPropertyType = async () => {
  const response = await axios.get("https://misbar-backend-chartjs.azurewebsites.net/api/propertyType/");
  return response.data;
};

export const usePropertyTypesQuery = () =>
  useQuery<propertyType[]>(["propertyTypes"], () => getPropertyType(), {
    refetchOnWindowFocus: false,
  });

const getPropertyTypeChart = async (  
  date_level?: string,
region_id?: string,
province_id?: string,
neighborhood_id?: string,
start_date?: string,
end_date?: string,
) => {
  const response = await axios.get(
    "https://misbar-backend-chartjs.azurewebsites.net/api/transaction/property/" +
      `?${date_level ? "date_level=" + date_level : ""}${
        region_id ? "&region_id=" + region_id : ""
      }
    ${start_date ? "&start_date=" + start_date : ""}${
        end_date ? "&end_date=" + end_date : ""
      }
      ${province_id ? "&province_id=" + province_id : ""}${
        neighborhood_id
          ? "&neighborhood_id=" + neighborhood_id
          : ""
      }`
  );
  return response.data;
};

export const usePropertyTypeChartQuery = (  date_level?: string,
  region_id?: string,
  province_id?: string,
  neighborhood_id?: string,
  start_date?: string,
  end_date?: string,) =>
  useQuery(
    ["propertyTypeChart", 
          date_level,
        region_id,
        province_id,
        neighborhood_id,
        start_date,
        end_date,
  ],
    () => getPropertyTypeChart(          date_level,
      region_id,
      province_id,
      neighborhood_id,
      start_date,
      end_date,),
    { refetchOnWindowFocus: false }
  );
