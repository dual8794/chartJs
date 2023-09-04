import { useQuery } from "@tanstack/react-query";
// import { MetricsResponse } from "../types/metrics.typs"
// import { UseFormReturnType } from "@mantine/form";
import axios from "axios";

const getMetricsDetails = async (
    indicator?: string,
    metrics_type?: string,
    neighborh_aname?: string,
    province_aname?: string,
    start_date?: string,
    end_date?: string,
    start_year?: string,
    end_year?: string,
    start_month?: string,
    end_month?: string,
    start_quarter?: string,
    end_quarter?: string )=> {
    const response = await axios.get(
        "http://127.0.0.1:8000/api/metricsdetailed" + `?${indicator? "indicator=" + indicator: ""}${metrics_type? "&metrics_type=" + metrics_type: ""}
        ${neighborh_aname? "&neighborh_aname=" + neighborh_aname: ""}${province_aname? "&province_aname=" + province_aname: ""}${start_date? "&start_date=" + start_date: ""}
        ${end_date? "&end_date=" + end_date: ""}${start_year? "&start_year=" + start_year: ""}${end_year? "&end_year=" + end_year: ""}${start_month? "&start_month=" + start_month: ""}
        ${end_month? "&end_month=" + end_month: ""}${start_quarter? "&start_quarter=" + start_quarter: ""}${end_quarter? "&end_quarter=" + end_quarter: ""}`
    )
    return response.data;

}

export const useMetricsDetailsQuery = ( 
    indicator?: string,
    metrics_type?: string,
    neighborh_aname?: string,
    province_aname?: string,
    start_date?: string,
    end_date?: string,
    start_year?: string,
    end_year?: string,
    start_month?: string,
    end_month?: string,
    start_quarter?: string,
    end_quarter?: string
    ) => 
      useQuery(
        [
            "metrics",
            indicator,
            metrics_type,
            neighborh_aname,
            province_aname,
            start_date,
            end_date,
            start_year,
            end_year,
            start_month,
            end_month,
            start_quarter,
            end_quarter,
        ],
        () => getMetricsDetails(  indicator,
            metrics_type,
            neighborh_aname,
            province_aname,
            start_date,
            end_date,
            start_year,
            end_year,
            start_month,
            end_month,
            start_quarter,
            end_quarter,),

        { refetchOnWindowFocus: false }
      );
    
