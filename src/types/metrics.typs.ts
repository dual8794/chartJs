export interface MetricsFilters {
    indicator?: string,
    growth_type?: string
    metrics_type: string,
    neighborh_aname: string,
    province_aname: string,
    start_date: string,
    end_date: string,
    start_year: string,
    end_year: string,
    start_month: string,
    end_month: string,
    start_quarter: string,
    end_quarter: string,

}

export interface MetricsResponse {
    neighborhood_id: number,
    neighborh_aname: string,
    metrics_type: string,
    metrics_batch_date: string,
    province_id: number,
    province_aname: string,
    price_of_meter: any,
    total_transactions: number,
    volume: any,
    indicator: string
}