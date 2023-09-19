export interface MetricsFilters {
    date_level?: string,
    region_id?: string,
    province_id?: string,
    neighborhood_id?: string,
    property_type_id?: number
    // region_aname: string,
    // neighborh_aname: string,
    // province_aname: string,
    start_date?: string,
    end_date?: string,
    // start_year?: string,
    // end_year?: string,
    // start_month?: string,
    // end_month?: string,
    // start_quarter?: string,
    // end_quarter?: string,

}

export interface MetricsResponse {
    neighborhood_id: number,
    region_aname: string,
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


export interface Kpis {
    total_transactions?: string;
    transactions_count?: string;
    avg_price_per_meter?: string;
    avg_price_per_unit?: string;
    avg_area_per_unit?: string;
    
}

export interface GrowthResponse {
    year: number,
    transactions_count: number,
    total_transactions: number,
    transactions_count_growth: number,
    total_transactions_growth: number,

}


export interface Region {
    id: number,
    name_ar: string,
    name_en: string,
    capital_name_ar: string,
    capital_name_en: string,

}

export interface Province {
    id: number,
    region_id: number,
    name_ar: string,
    name_en: string,
}

export interface Neighborhood {
    id: number,
    province_id: number,
    name_ar: string,
    name_en: string,
}

export interface propertyType {
    id: number,
    name_ar: string,
    name_en: string,
}
