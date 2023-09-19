import { useQuery } from "@tanstack/react-query";
import axios from "axios";

    
const getSakani = async (
    date_level?: string,
    region_id?: string,
    province_id?: string,
    neighborhood_id?: string,
    start_date?: string,
    end_date?: string, 

        )=> {
        const response = await axios.get(
            "https://misbar-backend-chartjs.azurewebsites.net/api/transaction/sakani-commercial/"  +
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
        )
        return response.data;
    
}
    
export const useSakaniQuery = ( 
    date_level?: string,
    region_id?: string,
    province_id?: string,
    neighborhood_id?: string,
    start_date?: string,
    end_date?: string,
        ) => 
          useQuery(
            [
                "sakani",
                date_level,
                region_id,
                province_id,
                neighborhood_id,
                start_date,
                end_date,
            ],
            () => getSakani(  
                date_level,
                region_id,
                province_id,
                neighborhood_id,
                start_date,
                end_date,
                ),
    
            { refetchOnWindowFocus: false }
          );