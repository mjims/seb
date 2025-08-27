export interface HistoricalType {
    id: string;
    merchant: string;
    status: string;
    notes: string;
    timestamp: string;
}

export interface HistoricalListType{
    count: number;
    next: string;
    previous: string;
    results: HistoricalType[];
}