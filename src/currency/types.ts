export interface CurrencyExchangeRequest {
    from_currency: string;
    to_currency: string;
    amount: number;
    date: string;
}

export interface CurrencyExchangeResponse {
    currency: string;
    value: number;
    date: string;
}

export interface CurrencyPrice {
    currency: string;
    price_pln: string;
    date: string;
}

export interface CurrencyPriceRequest {
    currencies: CurrencyPrice[];
}

export interface CurrencyPriceResponse {
    currencies: CurrencyPrice[];
}
