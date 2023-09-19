import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBuilding = async (
    neighborhood_id?: string,
    year?: string, 

        )=> {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/parcels/predictions/"  +
            `?${
                neighborhood_id ? "&neighborhood_id=" + neighborhood_id : ""
            }${year ? "&year=" + year : ""}`
        )
        return response.data;
    
}
    
export const useBuildingQuery = ( 
    neighborhood_id?: string,
    year?: string, 
        ) => 
          useQuery(
            [
                "building",
                neighborhood_id,
                year
            ],
            () => getBuilding(  
                neighborhood_id,
                year
                ),
    
            { refetchOnWindowFocus: false }
          );