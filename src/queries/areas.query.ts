import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MetricsFilters } from "../types/metrics.typs";

    
const getAreas = async (
    filters?: MetricsFilters, 

        )=> {
        const response = await axios.get(
            "https://misbar-backend-chartjs.azurewebsites.net/api/transaction/area-categorized/"  +
            `?${filters?.date_level ? "date_level=" + filters?.date_level : ""}${
              filters?.region_id ? "&region_id=" + filters?.region_id : ""
            }
            ${filters?.start_date? "&start_date=" + filters?.start_date: ""}${filters?.end_date? "&end_date=" + filters?.end_date: ""}
              ${filters?.province_id ? "&province_id=" + filters?.province_id : ""}${
                filters?.neighborhood_id ? "&neighborhood_id=" + filters?.neighborhood_id : ""
            }${filters?.property_type_id ? "&property_type_id=" + filters?.property_type_id : ""}`
        )
        return response.data;
    
}
    
export const useAreasQuery = ( 
    filters?: MetricsFilters, 

        ) => 
          useQuery(
            [
                "areas",
                filters,
            ],
            () => getAreas(  
                filters,
                ),
    
            { refetchOnWindowFocus: false }
          );